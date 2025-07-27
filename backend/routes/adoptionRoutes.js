const express = require('express');
const router = express.Router();
const Adoption = require('../models/Adoption');

// @route   POST /api/adoptions
// @desc    Submit new adoption application
router.post('/', async (req, res) => {
  try {
    const newAdoption = new Adoption(req.body);
    const savedAdoption = await newAdoption.save();
    res.status(201).json(savedAdoption);
  } catch (err) {
    console.error('❌ Error saving adoption:', err.message);
    res.status(500).json({ error: 'Failed to save adoption application' });
  }
});

// @route   GET /api/adoptions
// @desc    Get all adoption applications (for admin)
router.get('/', async (req, res) => {
  try {
    const adoptions = await Adoption.find().sort({ submittedAt: -1 });
    res.json(adoptions);
  } catch (err) {
    console.error('❌ Error fetching adoptions:', err.message);
    res.status(500).json({ error: 'Failed to fetch adoption applications' });
  }
});

module.exports = router;