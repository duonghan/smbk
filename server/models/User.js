const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create new schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    enum: ['ADMIN', 'DEFAULT', 'GUEST'],
    default: 'DEFAULT',
  },

  gender: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    enum: ['male', 'female'],
  },

  avatar: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  confirmed: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('users', UserSchema);
module.exports = User;
