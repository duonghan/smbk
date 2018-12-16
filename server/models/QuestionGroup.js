const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create new schema
const QuestionSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  survey: {
    type: Schema.Types.ObjectId,
    ref: 'surveys',
    required: true,
  },

  parent: {
    type: Schema.Types.ObjectId,
    ref: 'questionGroups',
  },

  childs: [
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
    lowercase: true,
    trim: true,
  },

  optionAnswers: [
    {
      text: String,
      score: Number,
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

const Question = mongoose.model('questionGroups', QuestionSchema);
module.exports = Question;
