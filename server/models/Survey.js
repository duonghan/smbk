const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create new schema
const SurveySchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
    default: '',
  },

  cover: {
    type: String,
    required: true,
    default: '',
  },

  title: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  lastUpdate: {
    type: Date,
    default: Date.now,
  },
});

const Survey = mongoose.model('surveys', SurveySchema);
module.exports = Survey;
