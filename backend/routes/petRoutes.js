const express = require('express');
const router = express.Router();
const multer = require('multer');
const Pet = require('../models/Pet');
const path = require('path');

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

// @route   GET /api/pets
router.get('/', (req, res) => {
  res.send('🐾 Pet route is working!');
});

// @route   POST /api/pets
// @desc    Add new pet
router.post('/', upload.single('image'), async (req, res) => {
  console.log('🚀 Incoming pet data:', req.body);

  const { name, breed, age, type, location, description, contactEmail } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const newPet = new Pet({
      name,
      breed,
      age,
      type,
      location,
      description,
      contactEmail,
      image,
      status: 'pending'
    });

    const savedPet = await newPet.save();
    console.log('✅ Pet saved:', savedPet);
    res.status(201).json(savedPet);
  } catch (err) {
    console.error('❌ Error saving pet:', err.message);
    res.status(500).json({ error: 'Failed to save pet' });
  }
});

// GET all pet listings
router.get('/all', async (req, res) => {
  try {
    const pets = await Pet.find({});
    res.json(pets);
  } catch (err) {
    console.error('❌ Error fetching pets:', err.message);
    res.status(500).json({ error: 'Failed to fetch pets' });
  }
});

// GET all pending pets
router.get('/pending', async (req, res) => {
  try {
    const pendingPets = await Pet.find({ status: "pending" });
    res.json(pendingPets);
  } catch (err) {
    console.error('❌ Error fetching pending pets:', err.message);
    res.status(500).json({ error: 'Failed to fetch pending pets' });
  }
});

// PATCH /api/pets/:id/status
// Update status (approved, rejected, moreInfo) + optional request message
router.patch('/:id/status', async (req, res) => {
  const { status, requestMessage } = req.body;

  if (!['approved', 'rejected', 'pending', 'moreInfo'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.id,
      {
        status,
        requestMessage: requestMessage || ''
      },
      { new: true }
    );

    if (!updatedPet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    res.json(updatedPet);
  } catch (err) {
    console.error('❌ Error updating pet status:', err.message);
    res.status(500).json({ error: 'Failed to update pet status' });
  }
});

router.put('/approve/:id', async (req, res) => {
  try {
    const petId = req.params.id;
    const updatedPet = await Pet.findByIdAndUpdate(petId, { approved: true });

    if (!updatedPet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    res.status(200).json({ message: 'Pet approved successfully' });
  } catch (err) {
    console.error("❌ Error in approval route:", err);
    res.status(500).json({ message: 'Server error while approving' });
  }
});
router.get('/approved', async (req, res) => {
  try {
    const approvedPets = await Pet.find({ status: "approved" })
      .select('-status -__v -createdAt -updatedAt -requestMessage');
    
    res.json(approvedPets);
  } catch (err) {
    console.error('❌ Error fetching approved pets:', err.message);
    res.status(500).json({ error: 'Failed to fetch approved pets' });
  }
});

module.exports = router;
