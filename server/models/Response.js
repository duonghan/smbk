const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create new schema
const ResponseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },

  profile: {
    type: Schema.Types.ObjectId,
    ref: 'mocprofiles',
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

  answers: [
    {
      questionId: {
        type: Schema.Types.ObjectId,
        ref: 'questions',
      },
      value: Number,
      text: String, // when question has type text-area
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

const Response = mongoose.model('responses', ResponseSchema);
module.exports = Response;
