const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create new schema
const QuestionSchema = new Schema({
  orderNumber: {
    type: Number,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  group: {
    type: Schema.Types.ObjectId,
    ref: 'questionGroups',
  },
});

const Question = mongoose.model('questions', QuestionSchema);
module.exports = Question;
