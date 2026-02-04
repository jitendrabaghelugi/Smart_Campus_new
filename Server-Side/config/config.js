const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log(' MongoDB Connected to database: cms'))
    .catch(err => console.error(' MongoDB connection error:', err));
