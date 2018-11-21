const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  handle: {
    type: String,
    required: true,
    max: 40,
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  items: {
    type: Schema.Types.ObjectId,
  },
});

const Profile = mongoose.model('profile', ProfileSchema);

module.exports = Profile;
