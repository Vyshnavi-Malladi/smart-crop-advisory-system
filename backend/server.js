const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/ml', require('./routes/ml'));
app.use('/api/weather', require('./routes/weather'));
app.use('/api/store', require('./routes/store'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/chatbot', require('./routes/chatbot')); // If using custom route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
