const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const registrationRoutes = require('./routes/registrationRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/registrations', registrationRoutes); // Note: Includes the organizer check route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`UniNow Backend running on port ${PORT}`);
});

