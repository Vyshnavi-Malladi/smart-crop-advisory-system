// const mongoose = require('mongoose');

// const ProductSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: String },
//     price: { type: Number, required: true },
//     category: { type: String },
//     image: { type: String }, // URL or placeholder
//     stock: { type: Number, default: 100 }
// });

// module.exports = mongoose.model('Product', ProductSchema);





const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }, // fertilizer / seed
    type: { type: String }, // organic / inorganic
    nutrient: { type: String }, // nitrogen / phosphorus / potassium / complex
    stock: { type: Number, default: 50 },
    image: { type: String },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);