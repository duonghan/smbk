const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create new schema
const QuestionSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'questions',
  },
  survey: {
    type: Schema.Types.ObjectId,
    ref: 'surveys',
  },
  inputType: {
    type: String,
    required: true,
  },
  optionChoice: {
    type: [{}],
    required: true,
  },
});

const Question = mongoose.model('questions', QuestionSchema);
module.exports = Question;
