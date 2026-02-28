const express = require('express');
const router = express.Router();
const axios = require('axios');

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';

router.post('/ask', async (req, res) => {
    const { question } = req.body;

    if (!question) return res.status(400).json({ error: "Question required" });

    try {
        // Call Ollama
        // We use 'llama3' or 'mistral' or whatever is installed. 
        // Standard Ollama API: /api/generate
        const response = await axios.post(`${OLLAMA_URL}/api/generate`, {
            model: "llama3", // Default model, user can change
            prompt: `You are an expert agricultural assistant. Answer the following question for a farmer concisely and helpfully: ${question}`,
            stream: false
        });

        res.json({ answer: response.data.response });
    } catch (err) {
        // Fallback if Ollama is down or model missing
        console.log("Ollama error:", err.message);
        res.json({
            answer: "I'm having trouble connecting to my AI brain right now. But generally, for farming advice, please consult your local agricultural officer.",
            error: err.message
        });
    }
});

module.exports = router;
