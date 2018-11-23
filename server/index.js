/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const ngrokInit = require('ngrok');
const path = require('path');
const logger = require('./logger');

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const app = express();

const users = require('./routers/api/users');
const profile = require('./routers/api/profile');
const form = require('./routers/api/form');
const survey = require('./routers/api/survey/survey');
const questions = require('./routers/api/survey/question');
const questionGroup = require('./routers/api/survey/questionGroup');
const answers = require('./routers/api/answer');

const auth = require('./routers/auth');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Config database
const db = require('./config/keys').mongoURI;

// Connect to DB
mongoose
  .connect(
    db,
    { useNewUrlParser: true },
  )
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Use Router
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/form', form);
app.use('/api/survey', survey);
app.use('/api/survey/question-groups', questionGroup);
app.use('/api/survey/questions', questions);
app.use('/api/survey/answers', answers);
app.use('/auth', auth);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
