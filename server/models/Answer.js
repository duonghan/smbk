const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create new schema
const AnswerSchema = new Schema({
  question: {
    type: Schema.Types.ObjectId,
    ref: 'questions',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  answer: {
    type: String,
    required: true,
  },
});

const Answer = mongoose.model('answers', AnswerSchema);
module.exports = Answer;
