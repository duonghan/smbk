const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create new schema
const SurveySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  title: {
    type: String,
    required: true,
  },
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  ],
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
