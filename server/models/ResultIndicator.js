const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create new schema
const ResultIndicatorSchema = new Schema({
  survey: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'surveys',
  },

  name: {
    type: String,
    required: true,
  },

  description: String,

  level: Number,
});

const ResultIndicator = mongoose.model(
  'resultindicator',
  ResultIndicatorSchema,
);
module.exports = ResultIndicator;
