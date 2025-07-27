const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema({
  petName: String,
  fullName: String,
  phone: String,
  address: String,
  occupation: String,
  houseType: String,
  ownership: String,
  reason: String,
  experience: String,
  currentPets: String,
  hoursAlone: Number,
  status: {
    type: String,
    default: "pending"
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Adoption', adoptionSchema);