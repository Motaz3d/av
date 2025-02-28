// models/registration.js
const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    match: /^[A-Za-z]+$/  // التأكد من استخدام الأحرف اللاتينية فقط
  },
  lastName: {
    type: String,
    required: true,
    match: /^[A-Za-z]+$/
  },
  postalCode: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    default: 'Luxembourg'
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true,
    min: 1,
    max: 4
  },
  registeredAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Registration', RegistrationSchema);