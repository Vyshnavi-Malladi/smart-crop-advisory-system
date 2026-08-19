// const mongoose = require('mongoose');

// const AgriProductSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     category: { type: String, enum: ["fertilizer", "seed"], required: true },
//     type: { type: String, enum: ["organic", "inorganic"] },
//     nutrient: { type: String },
//     stock: { type: Number, default: 100 },
//     image: { type: String },
//     description: { type: String }
// }, { timestamps: true });

// module.exports = mongoose.model("AgriProduct", AgriProductSchema);










const mongoose = require('mongoose');

const AgriProductSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    category: {
        type: String,
        required: true,
        enum: ["fertilizer", "seed"]
    },

    // For Fertilizers → Organic / Inorganic / Bio
    type: {
        type: String,
        enum: ["organic", "inorganic", "bio"],
        default: null
    },

    // For Fertilizers → Nitrogen / Phosphorus / Potassium / Complex
    nutrient: {
        type: String,
        enum: ["nitrogen", "phosphorus", "potassium", "complex"],
        default: null
    },

    // For Seeds → Vegetable / Fruit
    seedType: {
        type: String,
        enum: ["vegetable", "fruit"],
        default: null
    },

    stock: {
        type: Number,
        default: 0,
        min: 0
    },

    image: {
        type: String
    },

    description: {
        type: String
    }

}, { timestamps: true });

module.exports = mongoose.model("AgriProduct", AgriProductSchema);