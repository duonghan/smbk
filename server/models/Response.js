const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create new schema
const ResponseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  answer: {
    type: String,
    required: true,
  },
});

const Response = mongoose.model('answers', ResponseSchema);
module.exports = Response;
