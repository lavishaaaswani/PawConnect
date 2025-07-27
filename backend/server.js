console.log("✅ Starting server.js...");
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs=require('fs');
const uploadsDir=path.join(__dirname,'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Created uploads directory');
}
const adoptionRoutes = require('./routes/adoptionRoutes');

const app = express();

console.log("✅ Middleware setup started");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, '..')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

console.log("✅ Attempting MongoDB connection...");

mongoose.connect('mongodb+srv://aaswanilavisha:MOl0KuWqLuk6jhAA@cluster0.o4m1d42.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  // remove deprecated options
}).then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.log('❌ DB connection error:', err));


console.log("✅ Loading routes...");

const strayRoutes = require('./routes/stray');
const authRoutes = require('./routes/auth');
const petRoutes = require('./routes/petRoutes'); 

console.log("✅ Routes loaded, applying to app...");

app.use('/api/strays', strayRoutes);
app.use('/api', authRoutes);
app.use('/api/pets', petRoutes); 
app.use('/api/adoptions', adoptionRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
