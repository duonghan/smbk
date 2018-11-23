const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create new schema
const QuestionSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model('questions', QuestionSchema);
module.exports = Question;
