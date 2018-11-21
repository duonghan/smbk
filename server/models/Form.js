const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create Form Schema
const FormSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
  },
  content: {
    type: Object,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
});

const Form = mongoose.model('form', FormSchema);
module.exports = Form;
