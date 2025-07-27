const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: String,
  type: String,
  location: String,
  description: String,
  contactEmail: String,
  image: String,
  status: {
    type: String,
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);
