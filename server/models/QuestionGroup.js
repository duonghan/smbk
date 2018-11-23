const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create new schema
const QuestionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  survey: {
    type: Schema.Types.ObjectId,
    ref: 'surveys',
  },
  child: [
    {
      type: Schema.Types.ObjectId,
      ref: 'questionGroups',
    },
  ],
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'questions',
      default: [],
    },
  ],
  inputType: {
    type: String,
    required: true,
    default: 'radio',
  },
  optionAnswer: [
    {
      type: String,
    },
  ],
});

const Question = mongoose.model('questionGroups', QuestionSchema);
module.exports = Question;
