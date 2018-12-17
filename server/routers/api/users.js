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
const Response = require('../../models/Response');
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

        // then handleUpdate new user into db
        newUser
          .save()
          .then(user => {
            res.json(user);

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
  const { isGuest } = req.body;
  // Login with Guest
  if (isGuest) {
    User.findOne({ name: 'Guest' })
      .then(user => {
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          role: user.role,
        }; // Create JWT payload

        // Sign token
        jwt.sign(payload, keys.secretOrKey, { expiresIn: '1d' }, (err, token) =>
          res.json({ success: true, token: `Bearer ${token}` }),
        );
      })
      .catch(err => res.json(err));
  } else {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
      res.status(400).json(errors);
    }

    const { email, password, isRemember } = req.body;

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
            { expiresIn: isRemember ? '1w' : '1d' },
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
  }
});

/**
 * @function: GET /api/users/current
 * @desc: Return current user
 * @access: private
 */
router.get(
  '/current',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
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
router.put(
  '/',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    try {
      User.findById(req.body.id).then(user => {
        const updatedUser = {
          email: req.body.email,
          name: req.body.name,
        };

        // when admin update user info
        if (req.user.role === 'ADMIN') {
          updatedUser.role = req.body.role;
        }

        // if update user's password
        if (req.body.currentPassword && req.body.newPassword) {
          bcrypt
            .compare(req.body.currentPassword, user.password)
            .then(isMatch => {
              // Check password
              if (isMatch) {
                bcrypt.genSalt(10, (e, salt) => {
                  bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
                    if (err) throw err;

                    updatedUser.password = hash;

                    User.findByIdAndUpdate(
                      req.body.id,
                      {
                        $set: updatedUser,
                      },
                      { new: true },
                    )
                      .then(newUser => {
                        const payload = {
                          id: newUser.id,
                          name: newUser.name,
                          avatar: newUser.avatar,
                          role: newUser.role,
                        }; // Create JWT payload

                        // Sign token
                        jwt.sign(
                          payload,
                          keys.secretOrKey,
                          { expiresIn: '1d' },
                          (err, token) => {
                            res.json({
                              success: true,
                              token: `Bearer ${token}`,
                            });
                          },
                        );
                      })
                      .catch(() => res.json({ success: false }));
                  });
                });
              } else {
                return res.json({
                  success: false,
                  message: 'incorrectCurrentPassword',
                });
              }
            });
        } else {
          // if only update base information
          User.findByIdAndUpdate(
            req.body.id,
            {
              $set: updatedUser,
            },
            { new: true },
          )
            .then(newUser => {
              const payload = {
                id: newUser.id,
                name: newUser.name,
                avatar: newUser.avatar,
                role: newUser.role,
              }; // Create JWT payload

              // Sign token
              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: '1d' },
                (err, token) => {
                  res.json({
                    success: true,
                    token: `Bearer ${token}`,
                  });
                },
              );
            })
            .catch(() => res.json({ success: false }));
        }
      });
    } catch (e) {
      return res
        .status(403)
        .send({ message: 'You have no rights to visit this page' });
    }
  },
);

router.delete(
  '/',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    if (req.user.role === 'ADMIN') {
      try {
        Response.deleteMany({ user: req.body.id }, err => {
          if (!err) {
            User.findByIdAndDelete(req.body.id).then(() =>
              res.json({ success: true }),
            );
          }
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      return res.json({ sucess: false });
    }
  },
);

/**
 * @function: GET /api/users/list
 * @desc: Return list user in db
 * @access: private
 */
router.get(
  '/list',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    // only return result when user has admin role
    if (req.user.role === 'ADMIN') {
      User.find({
        role: {
          $ne: 'GUEST',
        },
      })
        .sort({ date: -1 })
        .then(users =>
          res.json(
            users.map(user => ({
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              date: user.date,
            })),
          ),
        )
        .catch(err => res.status(404).json(err));
    } else {
      res.status(403).send('You have no rights to visit this page');
    }
  },
);

module.exports = router;
