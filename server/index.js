/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
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
const mocprofiles = require('./routers/api/mocprofiles');
const survey = require('./routers/api/survey/survey');
const questions = require('./routers/api/survey/question');
const responses = require('./routers/api/survey/response');
const questionGroup = require('./routers/api/survey/questionGroup');

const auth = require('./routers/auth');

// chart
const mocChart = require('./routers/api/chart/moc');
const dashboardChart = require('./routers/api/chart/dashboard');
const psychologicalChart = require('./routers/api/chart/psychological');
const neoChart = require('./routers/api/chart/neo');
const riasecChart = require('./routers/api/chart/riasec');

// excel
const excel = require('./routers/api/excel');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
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
app.use('/api/mocprofiles', mocprofiles);
app.use('/api/survey', survey);
app.use('/api/survey/question-groups', questionGroup);
app.use('/api/survey/questions', questions);
app.use('/api/survey/responses', responses);
app.use('/auth', auth);

app.use('/api/chart/moc', mocChart);
app.use('/api/chart/dashboard', dashboardChart);
app.use('/api/chart/psychological', psychologicalChart);
// app.use('/api/chart/neo', neoChart);
// app.use('/api/chart/riasec', riasecChart);

app.use('/api/excel', excel);

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
