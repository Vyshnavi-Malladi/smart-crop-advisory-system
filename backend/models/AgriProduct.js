const mongoose = require('mongoose');

const AgriProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, enum: ["fertilizer", "seed"], required: true },
    type: { type: String, enum: ["organic", "inorganic"] },
    nutrient: { type: String },
    stock: { type: Number, default: 100 },
    image: { type: String },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("AgriProduct", AgriProductSchema);