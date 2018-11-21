const nodemailer = require('nodemailer');
const account = require('./account');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: account.user, // generated ethereal user
    pass: account.pass, // generated ethereal password
  },
});

module.exports = transporter;
