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














// const express = require('express');
// const router = express.Router();
// const AgriProduct = require('../models/AgriProduct');


// // ======================================
// // GET ALL PRODUCTS (WITH AUTO SEED)
// // ======================================
// router.get('/products', async (req, res) => {
//     try {

//         const count = await AgriProduct.countDocuments();

//         // 🔥 AUTO SEED IF EMPTY
//         if (count === 0) {

//             await AgriProduct.insertMany([

//                 // ================= FERTILIZERS =================

//                 // Nitrogen
//                 {
//                     name: "Urea 50kg",
//                     price: 450,
//                     category: "fertilizer",
//                     type: "inorganic",
//                     nutrient: "nitrogen",
//                     stock: 100,
//                     image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=400&q=60",
//                     description: "High nitrogen fertilizer for rapid plant growth"
//                 },
//                 {
//                     name: "Ammonium Sulphate",
//                     price: 700,
//                     category: "fertilizer",
//                     type: "inorganic",
//                     nutrient: "nitrogen",
//                     stock: 80,
//                     image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=400&q=60",
//                     description: "Nitrogen + Sulphur fertilizer"
//                 },
//                 {
//                     name: "Calcium Ammonium Nitrate",
//                     price: 850,
//                     category: "fertilizer",
//                     type: "inorganic",
//                     nutrient: "nitrogen",
//                     stock: 75,
//                     image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=400&q=60",
//                     description: "Balanced nitrogen fertilizer"
//                 },

//                 // Phosphorus
//                 {
//                     name: "DAP 50kg",
//                     price: 1200,
//                     category: "fertilizer",
//                     type: "inorganic",
//                     nutrient: "phosphorus",
//                     stock: 90,
//                     image: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=400&q=60",
//                     description: "Strong root development fertilizer"
//                 },
//                 {
//                     name: "Single Super Phosphate",
//                     price: 600,
//                     category: "fertilizer",
//                     type: "inorganic",
//                     nutrient: "phosphorus",
//                     stock: 70,
//                     image: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=400&q=60",
//                     description: "Enhances flowering and root growth"
//                 },
//                 {
//                     name: "Rock Phosphate",
//                     price: 550,
//                     category: "fertilizer",
//                     type: "organic",
//                     nutrient: "phosphorus",
//                     stock: 60,
//                     image: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=400&q=60",
//                     description: "Natural phosphorus fertilizer"
//                 },

//                 // Potassium
//                 {
//                     name: "MOP 50kg",
//                     price: 950,
//                     category: "fertilizer",
//                     type: "inorganic",
//                     nutrient: "potassium",
//                     stock: 60,
//                     image: "https://plus.unsplash.com/premium_photo-1661962692059-55d5a4319814?auto=format&fit=crop&w=400&q=60",
//                     description: "Improves fruit quality"
//                 },
//                 {
//                     name: "Sulphate of Potash",
//                     price: 1100,
//                     category: "fertilizer",
//                     type: "inorganic",
//                     nutrient: "potassium",
//                     stock: 55,
//                     image: "https://plus.unsplash.com/premium_photo-1661962692059-55d5a4319814?auto=format&fit=crop&w=400&q=60",
//                     description: "Premium potassium fertilizer"
//                 },

//                 // Organic
//                 {
//                     name: "Vermicompost",
//                     price: 500,
//                     category: "fertilizer",
//                     type: "organic",
//                     nutrient: "complex",
//                     stock: 120,
//                     image: "https://images.unsplash.com/photo-1585314062604-1a357de8b000?auto=format&fit=crop&w=400&q=60",
//                     description: "Eco-friendly organic manure"
//                 },
//                 {
//                     name: "Organic Compost",
//                     price: 350,
//                     category: "fertilizer",
//                     type: "organic",
//                     nutrient: "complex",
//                     stock: 140,
//                     image: "https://images.unsplash.com/photo-1585314062604-1a357de8b000?auto=format&fit=crop&w=400&q=60",
//                     description: "Natural soil conditioner"
//                 },

//                 // ================= SEEDS =================

//                 {
//                     name: "Hybrid Rice Seeds",
//                     price: 800,
//                     category: "seed",
//                     type: "organic",
//                     nutrient: "NA",
//                     stock: 200,
//                     image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=60",
//                     description: "High yield paddy seeds"
//                 },
//                 {
//                     name: "Basmati Rice Seeds",
//                     price: 950,
//                     category: "seed",
//                     type: "organic",
//                     nutrient: "NA",
//                     stock: 180,
//                     image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=60",
//                     description: "Premium aromatic rice variety"
//                 },
//                 {
//                     name: "Premium Wheat Seeds",
//                     price: 600,
//                     category: "seed",
//                     type: "organic",
//                     nutrient: "NA",
//                     stock: 160,
//                     image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=60",
//                     description: "Disease resistant wheat seeds"
//                 },
//                 {
//                     name: "Durum Wheat Seeds",
//                     price: 750,
//                     category: "seed",
//                     type: "organic",
//                     nutrient: "NA",
//                     stock: 140,
//                     image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=60",
//                     description: "High protein wheat"
//                 },
//                 {
//                     name: "Maize Hybrid Seeds",
//                     price: 700,
//                     category: "seed",
//                     type: "organic",
//                     nutrient: "NA",
//                     stock: 170,
//                     image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=60",
//                     description: "High productivity maize"
//                 },
//                 {
//                     name: "Tomato Hybrid Seeds",
//                     price: 300,
//                     category: "seed",
//                     type: "organic",
//                     nutrient: "NA",
//                     stock: 200,
//                     image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=60",
//                     description: "High yield tomato seeds"
//                 },
//                 {
//                     name: "Chilli Seeds",
//                     price: 250,
//                     category: "seed",
//                     type: "organic",
//                     nutrient: "NA",
//                     stock: 190,
//                     image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=400&q=60",
//                     description: "Premium chilli seeds"
//                 },
//                 {
//                     name: "Brinjal Seeds",
//                     price: 280,
//                     category: "seed",
//                     type: "organic",
//                     nutrient: "NA",
//                     stock: 180,
//                     image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=60",
//                     description: "Hybrid brinjal seeds"
//                 }

//             ]);
//         }

//         const products = await AgriProduct.find();
//         res.json(products);

//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// module.exports = router;




















// const express = require('express');
// const router = express.Router();
// const AgriProduct = require('../models/AgriProduct');

// // ======================================
// // FORCE RESEED PRODUCTS (TEMPORARY FIX)
// // ======================================
// async function seedProducts() {

//     // 🔥 DELETE EVERYTHING FIRST
//     await AgriProduct.deleteMany({});

//     await AgriProduct.insertMany([
//         {
//             name: "Urea 46% N",
//             price: 450,
//             category: "fertilizer",
//             type: "inorganic",
//             nutrient: "nitrogen",
//             image: "urea.jpg",
//             stock: 100
//         },
//         {
//             name: "Neem Coated Urea",
//             price: 480,
//             category: "fertilizer",
//             type: "inorganic",
//             nutrient: "nitrogen",
//             image: "neem-coated-urea.jpg",
//             stock: 80
//         },
//         {
//             name: "Ammonium Sulphate",
//             price: 700,
//             category: "fertilizer",
//             type: "inorganic",
//             nutrient: "nitrogen",
//             image: "ammonium-sulphate.jpg",
//             stock: 60
//         },
//         {
//             name: "Calcium Ammonium Nitrate (CAN)",
//             price: 850,
//             category: "fertilizer",
//             type: "inorganic",
//             nutrient: "nitrogen",
//             image: "calcium-ammonium-nitrate.jpg",
//             stock: 75
//         },
//         {
//             name: "Ammonium Nitrate",
//             price: 900,
//             category: "fertilizer",
//             type: "inorganic",
//             nutrient: "nitrogen",
//             image: "ammonium-nitrate.jpg",
//             stock: 50
//         }
//     ]);

//     console.log("🔥 Database Reset & Seeded Successfully");
// }

// // ======================================
// // GET PRODUCTS
// // ======================================
// router.get('/products', async (req, res) => {
//     try {

//         await seedProducts(); // 🔥 ALWAYS RESET (temporary)

//         const products = await AgriProduct.find();
//         res.json(products);

//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// module.exports = router;


















// const express = require('express');
// const router = express.Router();
// const AgriProduct = require('../models/AgriProduct');


// // ================= FORCE RE-SEED PRODUCTS =================
// async function seedProducts() {

//   // 🔥 Delete old products (since you don't have DB access)
//   await AgriProduct.deleteMany({});

//   await AgriProduct.insertMany([

//     // ================= ORGANIC FERTILIZERS (10) =================
//     { name: "Vermicompost", price: 350, category: "fertilizer", type: "organic", nutrient: "nitrogen", stock: 120, image: "vermicompost.webp" },
//     { name: "Farm Yard Manure", price: 300, category: "fertilizer", type: "organic", nutrient: "nitrogen", stock: 150, image: "fym.jpg" },
//     { name: "Poultry Manure", price: 400, category: "fertilizer", type: "organic", nutrient: "nitrogen", stock: 90, image: "poultry.jpg" },
//     { name: "Bone Meal", price: 500, category: "fertilizer", type: "organic", nutrient: "phosphorus", stock: 70, image: "bone-meal.jpg" },
//     { name: "Fish Meal", price: 550, category: "fertilizer", type: "organic", nutrient: "nitrogen", stock: 60, image: "fish-meal.jpg" },
//     { name: "Seaweed Fertilizer", price: 600, category: "fertilizer", type: "organic", nutrient: "potassium", stock: 50, image: "seaweed.jpg" },
//     { name: "Neem Cake", price: 450, category: "fertilizer", type: "organic", nutrient: "nitrogen", stock: 100, image: "neem-cake.jpg" },
//     { name: "Compost", price: 280, category: "fertilizer", type: "organic", nutrient: "nitrogen", stock: 200, image: "compost.jpg" },
//     { name: "Green Manure", price: 320, category: "fertilizer", type: "organic", nutrient: "nitrogen", stock: 80, image: "green-manure.jpg" },
//     { name: "Wood Ash", price: 200, category: "fertilizer", type: "organic", nutrient: "potassium", stock: 60, image: "wood-ash.jpg" },

//     // ================= INORGANIC FERTILIZERS (10) =================
//     { name: "Urea 46% N", price: 450, category: "fertilizer", type: "inorganic", nutrient: "nitrogen", stock: 100, image: "urea.jpg" },
//     { name: "Neem Coated Urea", price: 480, category: "fertilizer", type: "inorganic", nutrient: "nitrogen", stock: 80, image: "neem-coated-urea.jpg" },
//     { name: "Ammonium Sulphate", price: 700, category: "fertilizer", type: "inorganic", nutrient: "nitrogen", stock: 60, image: "ammonium-sulphate.jpg" },
//     { name: "Calcium Ammonium Nitrate", price: 850, category: "fertilizer", type: "inorganic", nutrient: "nitrogen", stock: 75, image: "calcium-ammonium-nitrate.jpg" },
//     { name: "Ammonium Nitrate", price: 900, category: "fertilizer", type: "inorganic", nutrient: "nitrogen", stock: 50, image: "ammonium-nitrate.jpg" },
//     { name: "DAP", price: 1350, category: "fertilizer", type: "inorganic", nutrient: "phosphorus", stock: 100, image: "dap.jpg" },
//     { name: "Single Super Phosphate", price: 600, category: "fertilizer", type: "inorganic", nutrient: "phosphorus", stock: 100, image: "ssp.jpg" },
//     { name: "Muriate of Potash", price: 1200, category: "fertilizer", type: "inorganic", nutrient: "potassium", stock: 100, image: "mop.jpg" },
//     { name: "Sulphate of Potash", price: 1400, category: "fertilizer", type: "inorganic", nutrient: "potassium", stock: 80, image: "sop.webp" },
//     { name: "NPK 20-20-20", price: 1500, category: "fertilizer", type: "inorganic", nutrient: "complex", stock: 90, image: "npk.jpg" },

//     // ================= BIOFERTILIZERS (5) =================
//     { name: "Azospirillum", price: 300, category: "fertilizer", type: "bio", nutrient: "nitrogen", stock: 70, image: "azospirillum.jpg" },
//     { name: "Rhizobium", price: 320, category: "fertilizer", type: "bio", nutrient: "nitrogen", stock: 60, image: "rhizobium.jpg" },
//     { name: "Azotobacter", price: 310, category: "fertilizer", type: "bio", nutrient: "nitrogen", stock: 50, image: "azotobacter.jpg" },
//     { name: "PSB Culture", price: 350, category: "fertilizer", type: "bio", nutrient: "phosphorus", stock: 40, image: "psb.jpg" },
//     { name: "Mycorrhiza", price: 400, category: "fertilizer", type: "bio", nutrient: "phosphorus", stock: 45, image: "mycorrhiza.jpg" },

//     // ================= VEGETABLE SEEDS (10) =================
// { name: "Tomato Seeds", price: 500, category: "seed", seedType: "vegetable", stock: 100, image: "tomato.jpg" },
// { name: "Carrot Seeds", price: 400, category: "seed", seedType: "vegetable", stock: 80, image: "carrot.jpg" },
// { name: "Spinach Seeds", price: 350, category: "seed", seedType: "vegetable", stock: 90, image: "spinach.jpg" },
// { name: "Brinjal Seeds", price: 450, category: "seed", seedType: "vegetable", stock: 70, image: "brinjal.jpg" },
// { name: "Cabbage Seeds", price: 420, category: "seed", seedType: "vegetable", stock: 60, image: "cabbage.jpg" },
// { name: "Cauliflower Seeds", price: 430, category: "seed", seedType: "vegetable", stock: 75, image: "cauliflower.jpg" },
// { name: "Chilli Seeds", price: 390, category: "seed", seedType: "vegetable", stock: 85, image: "chilli.jpg" },
// { name: "Onion Seeds", price: 410, category: "seed", seedType: "vegetable", stock: 95, image: "onion.jpg" },
// { name: "Beans Seeds", price: 380, category: "seed", seedType: "vegetable", stock: 65, image: "beans.jpg" },
// { name: "Pumpkin Seeds", price: 360, category: "seed", seedType: "vegetable", stock: 50, image: "pumpkin.jpg" },

//    // ================= FRUIT SEEDS (10) =================
// { name: "Mango Seeds", price: 800, category: "seed", seedType: "fruit", stock: 50, image: "mango.jpg" },
// { name: "Papaya Seeds", price: 600, category: "seed", seedType: "fruit", stock: 70, image: "papaya.jpg" },
// { name: "Watermelon Seeds", price: 700, category: "seed", seedType: "fruit", stock: 60, image: "watermelon.jpg" },
// { name: "Guava Seeds", price: 650, category: "seed", seedType: "fruit", stock: 55, image: "guava.jpg" },
// { name: "Apple Seeds", price: 900, category: "seed", seedType: "fruit", stock: 40, image: "apple.jpg" },
// { name: "Banana Seeds", price: 750, category: "seed", seedType: "fruit", stock: 45, image: "banana.png" },
// { name: "Pomegranate Seeds", price: 850, category: "seed", seedType: "fruit", stock: 50, image: "pomegranate.jpg" },
// { name: "Orange Seeds", price: 720, category: "seed", seedType: "fruit", stock: 60, image: "orange.jpg" },
// { name: "Strawberry Seeds", price: 680, category: "seed", seedType: "fruit", stock: 55, image: "strawberry.jpg" },
// { name: "Grapes Seeds", price: 770, category: "seed", seedType: "fruit", stock: 50, image: "grapes.jpg" },

//   ]);

//   console.log("Products re-seeded successfully ✅");
// }


// // ================= GET ALL PRODUCTS =================
// router.get('/products', async (req, res) => {
//   try {

//     await seedProducts();

//     const products = await AgriProduct.find();

//     res.json(products);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;


















// const express = require('express');
// const router = express.Router();
// const AgriProduct = require('../models/AgriProduct');


// // ================= GET ALL PRODUCTS =================
// router.get('/products', async (req, res) => {
//   try {

//     const products = await AgriProduct.find();

//     res.json(products);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });


// module.exports = router;









const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const AgriProduct = require('../models/AgriProduct');


// ================= AUTH MIDDLEWARE =================
const adminAuth = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.user.role !== "admin") {
      return res.status(403).json({ msg: "Admin access required" });
    }

    req.user = decoded.user;
    next();

  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};


// ================= GET ALL PRODUCTS =================
router.get('/products', async (req, res) => {
  try {
    const products = await AgriProduct.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// ================= ADD PRODUCT (ADMIN) =================
router.post('/products', adminAuth, async (req, res) => {
  try {
    const product = new AgriProduct(req.body);
    await product.save();
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= UPDATE PRODUCT (ADMIN) =================
router.put('/products/:id', adminAuth, async (req, res) => {
  try {
    const updated = await AgriProduct.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, product: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= DELETE PRODUCT (ADMIN) =================
router.delete('/products/:id', adminAuth, async (req, res) => {
  try {
    await AgriProduct.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;