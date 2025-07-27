const express = require('express');
const router = express.Router();
const StrayReport = require('../models/StrayReport');

// Handle POST request to submit a stray animal report
router.post('/', async (req, res) => {
  try {
    const report = new StrayReport(req.body);
    console.log('Received stray report:', req.body);

    await report.save();
    res.status(200).json({ message: 'Stray report submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit stray report' });
  }
});

module.exports = router;
