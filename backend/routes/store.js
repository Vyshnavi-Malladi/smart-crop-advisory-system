// const express = require('express');
// const router = express.Router();
// const Product = require('../models/Product');
// const nodemailer = require('nodemailer');

// // Get all products
// router.get('/products', async (req, res) => {
//     try {
//         let products = await Product.find();
//         if (products.length === 0) {
//             // Seed if empty
//             const seeds = [
//                 { name: "Urea", price: 300, category: "Nitrogen", image: "urea.jpg", description: "High nitrogen content fertilizer" },
//                 { name: "DAP", price: 1200, category: "Phosphorus", image: "dap.jpg", description: "Di-ammonium Phosphate" },
//                 { name: "MOP", price: 850, category: "Potassium", image: "mop.jpg", description: "Muriate of Potash" },
//                 { name: "NPK 19-19-19", price: 900, category: "Complex", image: "npk.jpg", description: "Balanced fertilizer" }
//             ];
//             await Product.insertMany(seeds);
//             products = await Product.find();
//         }
//         res.json(products);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Purchase / Checkout
// router.post('/checkout', async (req, res) => {
//     const { user_email, cart_items, total_amount } = req.body;

//     if (!user_email || !cart_items) {
//         return res.status(400).json({ error: "Missing details" });
//     }

//     // Mock Payment Processing
//     const paymentSuccess = true;

//     if (paymentSuccess) {
//         // Send Email
//         try {
//             const transporter = nodemailer.createTransport({
//                 service: 'gmail',
//                 auth: {
//                     user: process.env.EMAIL_USER,
//                     pass: process.env.EMAIL_PASS
//                 }
//             });

//             const mailOptions = {
//                 from: process.env.EMAIL_USER,
//                 to: user_email,
//                 subject: 'Order Confirmation - AgriConnect',
//                 text: `Thank you for your order!\n\nUser: ${user_email}\nTotal: ₹${total_amount}\nItems: ${JSON.stringify(cart_items)}\n\nOrder Status: Processing`
//             };

//             // We don't await this to fail the request if email fails (unless critical), 
//             // but usually we should. For now, wrap in try-catch but don't block.
//             // However user didn't give credentials yet so it might fail.
//             transporter.sendMail(mailOptions, (error, info) => {
//                 if (error) {
//                     console.log("Email error: " + error);
//                 } else {
//                     console.log('Email sent: ' + info.response);
//                 }
//             });
//         } catch (e) {
//             console.log("Email setup error: " + e);
//         }

//         res.json({ success: true, message: "Order placed successfully!" });
//     } else {
//         res.status(400).json({ success: false, message: "Payment failed" });
//     }
// });

// module.exports = router;














const express = require('express');
const router = express.Router();
const AgriProduct = require('../models/AgriProduct');


// ======================================
// GET ALL PRODUCTS (WITH AUTO SEED)
// ======================================
router.get('/products', async (req, res) => {
    try {

        const count = await AgriProduct.countDocuments();

        // 🔥 AUTO SEED IF EMPTY
        if (count === 0) {

            await AgriProduct.insertMany([

                // ================= FERTILIZERS =================

                // Nitrogen
                {
                    name: "Urea 50kg",
                    price: 450,
                    category: "fertilizer",
                    type: "inorganic",
                    nutrient: "nitrogen",
                    stock: 100,
                    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=400&q=60",
                    description: "High nitrogen fertilizer for rapid plant growth"
                },
                {
                    name: "Ammonium Sulphate",
                    price: 700,
                    category: "fertilizer",
                    type: "inorganic",
                    nutrient: "nitrogen",
                    stock: 80,
                    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=400&q=60",
                    description: "Nitrogen + Sulphur fertilizer"
                },
                {
                    name: "Calcium Ammonium Nitrate",
                    price: 850,
                    category: "fertilizer",
                    type: "inorganic",
                    nutrient: "nitrogen",
                    stock: 75,
                    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=400&q=60",
                    description: "Balanced nitrogen fertilizer"
                },

                // Phosphorus
                {
                    name: "DAP 50kg",
                    price: 1200,
                    category: "fertilizer",
                    type: "inorganic",
                    nutrient: "phosphorus",
                    stock: 90,
                    image: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=400&q=60",
                    description: "Strong root development fertilizer"
                },
                {
                    name: "Single Super Phosphate",
                    price: 600,
                    category: "fertilizer",
                    type: "inorganic",
                    nutrient: "phosphorus",
                    stock: 70,
                    image: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=400&q=60",
                    description: "Enhances flowering and root growth"
                },
                {
                    name: "Rock Phosphate",
                    price: 550,
                    category: "fertilizer",
                    type: "organic",
                    nutrient: "phosphorus",
                    stock: 60,
                    image: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=400&q=60",
                    description: "Natural phosphorus fertilizer"
                },

                // Potassium
                {
                    name: "MOP 50kg",
                    price: 950,
                    category: "fertilizer",
                    type: "inorganic",
                    nutrient: "potassium",
                    stock: 60,
                    image: "https://plus.unsplash.com/premium_photo-1661962692059-55d5a4319814?auto=format&fit=crop&w=400&q=60",
                    description: "Improves fruit quality"
                },
                {
                    name: "Sulphate of Potash",
                    price: 1100,
                    category: "fertilizer",
                    type: "inorganic",
                    nutrient: "potassium",
                    stock: 55,
                    image: "https://plus.unsplash.com/premium_photo-1661962692059-55d5a4319814?auto=format&fit=crop&w=400&q=60",
                    description: "Premium potassium fertilizer"
                },

                // Organic
                {
                    name: "Vermicompost",
                    price: 500,
                    category: "fertilizer",
                    type: "organic",
                    nutrient: "complex",
                    stock: 120,
                    image: "https://images.unsplash.com/photo-1585314062604-1a357de8b000?auto=format&fit=crop&w=400&q=60",
                    description: "Eco-friendly organic manure"
                },
                {
                    name: "Organic Compost",
                    price: 350,
                    category: "fertilizer",
                    type: "organic",
                    nutrient: "complex",
                    stock: 140,
                    image: "https://images.unsplash.com/photo-1585314062604-1a357de8b000?auto=format&fit=crop&w=400&q=60",
                    description: "Natural soil conditioner"
                },

                // ================= SEEDS =================

                {
                    name: "Hybrid Rice Seeds",
                    price: 800,
                    category: "seed",
                    type: "organic",
                    nutrient: "NA",
                    stock: 200,
                    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=60",
                    description: "High yield paddy seeds"
                },
                {
                    name: "Basmati Rice Seeds",
                    price: 950,
                    category: "seed",
                    type: "organic",
                    nutrient: "NA",
                    stock: 180,
                    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=60",
                    description: "Premium aromatic rice variety"
                },
                {
                    name: "Premium Wheat Seeds",
                    price: 600,
                    category: "seed",
                    type: "organic",
                    nutrient: "NA",
                    stock: 160,
                    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=60",
                    description: "Disease resistant wheat seeds"
                },
                {
                    name: "Durum Wheat Seeds",
                    price: 750,
                    category: "seed",
                    type: "organic",
                    nutrient: "NA",
                    stock: 140,
                    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=60",
                    description: "High protein wheat"
                },
                {
                    name: "Maize Hybrid Seeds",
                    price: 700,
                    category: "seed",
                    type: "organic",
                    nutrient: "NA",
                    stock: 170,
                    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=60",
                    description: "High productivity maize"
                },
                {
                    name: "Tomato Hybrid Seeds",
                    price: 300,
                    category: "seed",
                    type: "organic",
                    nutrient: "NA",
                    stock: 200,
                    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=60",
                    description: "High yield tomato seeds"
                },
                {
                    name: "Chilli Seeds",
                    price: 250,
                    category: "seed",
                    type: "organic",
                    nutrient: "NA",
                    stock: 190,
                    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=400&q=60",
                    description: "Premium chilli seeds"
                },
                {
                    name: "Brinjal Seeds",
                    price: 280,
                    category: "seed",
                    type: "organic",
                    nutrient: "NA",
                    stock: 180,
                    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=60",
                    description: "Hybrid brinjal seeds"
                }

            ]);
        }

        const products = await AgriProduct.find();
        res.json(products);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;