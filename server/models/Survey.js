const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create new schema
const SurveySchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    default: '',
    trim: true,
  },

  cover: {
    type: String,
    required: true,
    default: '',
    trim: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
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
