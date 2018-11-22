const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create new schema
const QuestionSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  questionGroup: {
    type: Schema.Types.ObjectId,
    ref: 'questionGroups',
  },
});

const Question = mongoose.model('questions', QuestionSchema);
module.exports = Question;
