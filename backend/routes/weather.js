const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/forecast', async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ error: "Lat and Lon required" });
    }

    try {
        // Calling Open-Meteo
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,rain,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,rain,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,rain_sum&timezone=auto`;
        const response = await axios.get(url);

        const data = response.data;

        // Process for Spray Guidance
        // Simple logic: Unsafe if rain > 0 or wind > 15 km/h
        const current = data.current;
        const isRainy = current.rain > 0;
        const isWindy = current.wind_speed_10m > 15; // km/h

        let sprayGuidance = {
            canSpray: !isRainy && !isWindy,
            reason: []
        };

        if (isRainy) sprayGuidance.reason.push("Rain detected, spraying may wash away.");
        if (isWindy) sprayGuidance.reason.push("High wind speed, spraying may drift.");
        if (sprayGuidance.canSpray) sprayGuidance.reason.push("Conditions are favorable.");

        res.json({
            weather: data,
            spray_guidance: sprayGuidance
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
