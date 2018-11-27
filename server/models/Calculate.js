const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create new schema
const CalculateSchema = new Schema({
  survey: {
    type: Schema.Types.ObjectId,
    ref: 'surveys',
  },

  options: [],
});

const Calculate = mongoose.model('answers', CalculateSchema);
module.exports = Calculate;
