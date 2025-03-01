const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    match: /^[A-Za-z\s]+$/  // السماح بالأحرف اللاتينية مع المسافات
  },
  lastName: {
    type: String,
    required: true,
    match: /^[A-Za-z\s]+$/
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
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  },
  course: {
    type: String,
    required: true
  },
  registeredAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Registration', RegistrationSchema);