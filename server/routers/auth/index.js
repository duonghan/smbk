const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const hbs = require('nodemailer-express-handlebars');
const _ = require('lodash');
const transporter = require('../../utils/auth/sendMail');

// Load email secret key
const emailConfig = require('../../config/email');

// Load user model
const User = require('../../models/User');
const keys = require('../../config/keys');

// Options for nodemail
const options = {
  viewEngine: 'handlebars',
  viewPath: 'server/views/email/reset/',
  extName: '.hbs',
};
transporter.use('compile', hbs(options));

router.get('/test', (req, res) => {
  res.json({ msg: 'Test reset password successfully' });
});

/**
 * @function: POST /auth/forgot_password
 * @desc: Forgot password
 * @access: public
 */
router.post('/forgot-password', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(400).json({ msg: 'userNotFound' });
      }

      res.json(user);

      // send email to reset password
      jwt.sign(
        {
          user: _.pick(user, 'id'),
        },
        emailConfig.EMAIL_SECRET,
        {
          expiresIn: '1d',
        },
        (err, emailToken) => {
          const url = `${req.protocol}://${req.get(
            'host',
          )}/auth/reset-password/${emailToken}`;

          transporter.sendMail({
            to: user.email,
            subject: 'Xác thực đổi mật khẩu',
            template: 'reset_password',
            context: {
              name: user.name,
              email: user.email,
              urlConfirm: url,
            },
          });
        },
      );
    })
    .catch(error => console.log(error));
});

/**
 * @function: GET /auth/reset-password
 * @desc: Reset password
 * @access: public
 */
router.post('/reset-password/:token', (req, res) => {
  try {
    const { user } = jwt.verify(req.params.token, emailConfig.EMAIL_SECRET);
    const { password } = req.body;
    const { id } = user;

    // Update password
    User.findById(id)
      .then(user => {
        res.json({ user });

        // encrypt password
        bcrypt.genSalt(10, (e, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            const newPassword = hash;

            User.findByIdAndUpdate(id, { $set: { password: newPassword } })
              .then(user => {
                // send email to notify successfully change password
                transporter.sendMail({
                  to: user.email,
                  subject: 'Đổi mật khẩu thành công',
                  template: 'reset_success',
                  context: {
                    name: user.name,
                  },
                });
              })
              .catch(err =>
                res.status(400).json({ errors: 'Cannot find user' }),
              );
          });
        });
      })
      .catch(err => res.status(400).json(err));
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
