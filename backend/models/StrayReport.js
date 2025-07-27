// backend/models/StrayReport.js
const mongoose = require('mongoose');

const StrayReportSchema = new mongoose.Schema({
  name: String,
  email: String,
  location: String,
  description: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('StrayReport', StrayReportSchema);
