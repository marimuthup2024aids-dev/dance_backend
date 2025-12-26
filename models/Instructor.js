const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  specialties: [{
    type: String,
    required: true
  }],
  experience: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Instructor', instructorSchema);