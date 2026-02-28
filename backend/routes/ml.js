const express = require('express');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const fs = require('fs');

// Configure multer
const upload = multer({ dest: 'uploads/' });

const ML_URL = process.env.ML_SERVICE_URL || 'http://localhost:8001';

// Crop Recommendation
router.post('/recommend', async (req, res) => {
    try {
        const response = await axios.post(`${ML_URL}/recommend_crop`, req.body);
        res.json(response.data);
    } catch (err) {
        if (err.response) {
            res.status(err.response.status).json(err.response.data);
        } else {
            res.status(500).json({ error: err.message });
        }
    }
});

// Yield Prediction
router.post('/yield', async (req, res) => {
    try {
        const response = await axios.post(`${ML_URL}/predict_yield`, req.body);
        res.json(response.data);
    } catch (err) {
        if (err.response) {
            res.status(err.response.status).json(err.response.data);
        } else {
            res.status(500).json({ error: err.message });
        }
    }
});

// Disease Prediction
router.post('/disease', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const form = new FormData();
        form.append('file', fs.createReadStream(req.file.path));

        const response = await axios.post(`${ML_URL}/predict_disease`, form, {
            headers: {
                ...form.getHeaders()
            }
        });

        // Cleanup
        fs.unlinkSync(req.file.path);

        res.json(response.data);
    } catch (err) {
        // Cleanup
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        if (err.response) {
            res.status(err.response.status).json(err.response.data);
        } else {
            res.status(500).json({ error: err.message });
        }
    }
});

module.exports = router;
