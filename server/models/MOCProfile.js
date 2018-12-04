const mongoose = require('mongoose');
const { Schema } = mongoose;

// https://grokonez.com/node-js/mongoose-many-to-many-related-models-with-nodejs-express-mongodb

// Create new schema
const MOCProfileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  workUnit: {
    type: String,
    required: true,
  },

  position: {
    type: String,
    required: true,
  },

  mainTask: {
    type: String,
    required: true,
  },

  speciality: {
    type: String,
    required: true,
  },

  personalEmail: {
    type: String,
    required: true,
  },

  phone: {
    type: Number,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const MOCProfile = mongoose.model('mocprofiles', MOCProfileSchema);
module.exports = MOCProfile;
