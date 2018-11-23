/* eslint-disable consistent-return,no-shadow */
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const hbs = require('nodemailer-express-handlebars');
const passport = require('passport');
const _ = require('lodash');
const transporter = require('../../utils/auth/sendMail');

// Load Input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load email secret key
const emailConfig = require('../../config/email');

// Load user model
const User = require('../../models/User');
const keys = require('../../config/keys');

// Load user roles
const roles = require('../../config/roles');

// Options for nodemail
const options = {
  viewEngine: {
    extname: '.hbs',
    layoutsDir: 'server/views/email/',
    defaultLayout: 'template',
  },
  viewPath: 'server/views/email/',
  extName: '.hbs',
};

/**
 * @function: GET /api/users/test
 * @desc: Test user router
 * @access: public
 */
router.get('/test', (req, res) =>
  res.json({
    msg: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
  }),
);

/**
 * @function: POST /api/users/register
 * @desc: Register user
 * @access: public
 */
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    errors.email = 'existedEmail';

    if (user) {
      return res.status(400).json(errors);
    }

    const avatar = gravatar.url(req.body.email, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mm', // Default
    });

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      avatar,
      password: req.body.password,
      role: roles.default,
    });

    // encrypt password with bcrypt
    bcrypt.genSalt(10, (e, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;

        // then save new user into db
        newUser
          .save()
          .then(user => {
            res.json(user);
            console.log(`User is ${JSON.stringify(user)}`);

            // send email to validate email
            jwt.sign(
              {
                user: _.pick(user, 'id'),
              },
              emailConfig.EMAIL_SECRET,
              {
                expiresIn: '1d',
              },
              (err, emailToken) => {
                const url = `${req.protocol}://${req.get('host')}${
                  req.originalUrl
                }/confirmation/${emailToken}`;

                transporter.use('compile', hbs(options));
                transporter.sendMail({
                  to: newUser.email,
                  subject: 'Xác thực email',
                  template: 'template',
                  context: {
                    name: newUser.name,
                    today: new Date().toISOString().split('T')[0],
                    email: newUser.email,
                    urlConfirm: url,
                  },
                });
              },
            );
          })
          .catch(error => console.log(error));
      });
    });
  });
});

/**
 * @function: POST /api/users/confirmation
 * @param: token
 * @desc: confirm user email
 * @access: public
 */

router.get('/register/confirmation/:token', (req, res) => {
  try {
    const { user } = jwt.verify(req.params.token, emailConfig.EMAIL_SECRET);
    const { id } = user;

    // Update email validation status
    User.findOneAndUpdate({ _id: id }, { $set: { confirmed: true } }).then(
      user => res.redirect('/'),
    );
  } catch (e) {
    res.send('error');
  }
});

/**
 * @function: GET /api/users/login
 * @desc: Login user/ Returning JWT token
 * @access: public
 */
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    res.status(400).json(errors);
  }

  const { email, password } = req.body;

  // Find user email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'notfoundEmail';
      return res.status(404).json(errors);
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // res.json({ msg: 'Success' });
        // User matched
        const { confirmed } = user;

        if (!confirmed) {
          errors.confirmed = 'confirmEmail';
          return res.status(400).json(errors);
        }

        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          role: user.role,
        }; // Create JWT payload

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({ success: true, token: `Bearer ${token}` });
          },
        );
      } else {
        errors.password = 'incorrectPassword';
        return res.status(400).json(errors);
      }
    });
  });
});

/**
 * @function: GET /api/users/current
 * @desc: Return current user
 * @access: private
 */
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  },
);

/**
 * @function: POST /api/users/update
 * @desc: Update user info
 * @access: private
 */
router.post(
  '/update',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newProfile = {
      email: req.body.email,
      name: req.body.name,
    };

    const { id } = req.body;
    const errors = {};

    User.findById(id)
      .then(user => {
        if (!req.body.currentPassword) {
          User.findByIdAndUpdate(id, { $set: newProfile }).then(user =>
            res.json(newProfile),
          );
        } else {
          const { currentPassword } = req.body;

          // Check current password
          bcrypt.compare(currentPassword, user.password).then(isMatch => {
            if (isMatch) {
              newProfile.password = req.body.newPassword;

              // encrypt password with bcrypt
              bcrypt.genSalt(10, (e, salt) => {
                bcrypt.hash(newProfile.password, salt, (err, hash) => {
                  if (err) throw err;
                  newProfile.password = hash;

                  // then update new user into db
                  User.findByIdAndUpdate(id, {
                    $set: newProfile,
                  }).then(user => {
                    res.json(newProfile);
                  });
                });
              });
            } else {
              errors.password = 'incorrectCurrentPassword';
              return res.status(400).json(errors);
            }
          });
        }
      })
      .catch(err => res.json({ other: err }));
  },
);

/**
 * @function: GET /api/users/list
 * @desc: Return list user in db
 * @access: private
 */
router.get(
  '/list',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // only return result when user has admin role
    if (req.user.role === 'ADMIN') {
      User.find()
        .sort({ date: -1 })
        .then(users => res.json(users))
        .catch(err => res.status(404).json(err));
    } else {
      res.status(403).send('You have no rights to visit this page');
    }
  },
);

module.exports = router;
