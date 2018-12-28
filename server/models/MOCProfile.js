const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create new schema
const MOCProfileSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  workUnit: {
    type: String,
    required: true,
    trim: true,
  },

  position: {
    type: String,
    required: true,
    trim: true,
  },

  mainTask: {
    type: String,
    required: true,
    trim: true,
  },

  speciality: {
    type: String,
    required: true,
    trim: true,
  },

  personalEmail: {
    type: String,
    required: true,
    trim: true,
  },

  phone: {
    type: String,
    required: true,
    trim: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const MOCProfile = mongoose.model('mocprofiles', MOCProfileSchema);
module.exports = MOCProfile;
