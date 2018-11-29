const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create new schema
const ResponseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },

  survey: {
    type: Schema.Types.ObjectId,
    ref: 'surveys',
  },

  results: [
    {
      type: Schema.Types.ObjectId,
      ref: 'resultindicator',
    },
  ],

  score: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Response = mongoose.model('responses', ResponseSchema);
module.exports = Response;
