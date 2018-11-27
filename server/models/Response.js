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

  answers: [
    {
      questionId: {
        type: Schema.Types.ObjectId,
        ref: 'questions',
      },
      value: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Response = mongoose.model('responses', ResponseSchema);
module.exports = Response;
