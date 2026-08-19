// // const mongoose = require("mongoose");
// // require("dotenv").config();

// // const AgriProduct = require("./models/AgriProduct");

// // // CONNECT DB
// // mongoose.connect(process.env.MONGO_URI)
// //   .then(() => console.log("DB Connected"))
// //   .catch(err => console.log(err));

// // const products = [

// //   // 🌱 FERTILIZERS
// //   { name: "Urea", price: 500, category: "fertilizer", type: "inorganic", nutrient: "nitrogen", image: "urea.jpg", stock: 5 },
// //   { name: "DAP", price: 1200, category: "fertilizer", type: "inorganic", nutrient: "phosphorus", image: "dap.jpg", stock: 10 },
// //   { name: "NPK", price: 900, category: "fertilizer", type: "inorganic", nutrient: "complex", image: "npk.jpg", stock: 8 },
// //   { name: "Compost", price: 300, category: "fertilizer", type: "organic", image: "compost.jpg", stock: 6 },
// //   { name: "Neem Cake", price: 400, category: "fertilizer", type: "organic", image: "neem-cake.jpg", stock: 4 },
// //   { name: "Vermicompost", price: 350, category: "fertilizer", type: "organic", image: "vermicompost.webp", stock: 7 },
// //   { name: "Bone Meal", price: 600, category: "fertilizer", type: "organic", image: "bone-meal.jpg", stock: 3 },
// //   { name: "Fish Meal", price: 700, category: "fertilizer", type: "organic", image: "fish-meal.jpg", stock: 2 },

// //   // 🌿 VEGETABLE SEEDS
// //   { name: "Tomato", price: 50, category: "seed", seedType: "vegetable", image: "tomato.jpg", stock: 5 },
// //   { name: "Onion", price: 40, category: "seed", seedType: "vegetable", image: "onion.jpg", stock: 6 },
// //   { name: "Carrot", price: 30, category: "seed", seedType: "vegetable", image: "carrot.jpg", stock: 4 },
// //   { name: "Brinjal", price: 60, category: "seed", seedType: "vegetable", image: "brinjal.jpg", stock: 3 },
// //   { name: "Chilli", price: 70, category: "seed", seedType: "vegetable", image: "chilli.jpg", stock: 5 },
// //   { name: "Cabbage", price: 45, category: "seed", seedType: "vegetable", image: "cabbage.jpg", stock: 2 },
// //   { name: "Beans", price: 55, category: "seed", seedType: "vegetable", image: "beans.jpg", stock: 6 },
// //   { name: "Spinach", price: 35, category: "seed", seedType: "vegetable", image: "spinach.jpg", stock: 5 },

// //   // 🍎 FRUIT SEEDS
// //   { name: "Apple", price: 100, category: "seed", seedType: "fruit", image: "apple.jpg", stock: 3 },
// //   { name: "Mango", price: 120, category: "seed", seedType: "fruit", image: "mango.jpg", stock: 4 },
// //   { name: "Papaya", price: 90, category: "seed", seedType: "fruit", image: "papaya.jpg", stock: 2 },
// //   { name: "Banana", price: 80, category: "seed", seedType: "fruit", image: "banana.png", stock: 6 },
// //   { name: "Guava", price: 85, category: "seed", seedType: "fruit", image: "guava.jpg", stock: 3 },
// //   { name: "Orange", price: 95, category: "seed", seedType: "fruit", image: "orange.jpg", stock: 5 },
// //   { name: "Pomegranate", price: 110, category: "seed", seedType: "fruit", image: "pomegranate.jpg", stock: 2 },
// //   { name: "Grapes", price: 130, category: "seed", seedType: "fruit", image: "grapes.jpg", stock: 4 }

// // ];
// // // INSERT DATA
// // const seedData = async () => {
// //   try {
// //     await AgriProduct.deleteMany(); // optional
// //     await AgriProduct.insertMany(products);
// //     console.log("✅ Products inserted successfully");
// //     process.exit();
// //   } catch (err) {
// //     console.error(err);
// //     process.exit(1);
// //   }
// // };

// // seedData();








// const mongoose = require("mongoose");
// require("dotenv").config();

// const AgriProduct = require("./models/AgriProduct");

// // ================= CONNECT DB =================
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ DB Connected"))
//   .catch(err => {
//     console.error("❌ DB Error:", err);
//     process.exit(1);
//   });


// // ================= PRODUCTS =================
// const products = [

//   // 🌱 FERTILIZERS
//   { name: "Urea", price: 500, category: "fertilizer", type: "inorganic", nutrient: "nitrogen", image: "urea.jpg", stock: 5 },
//   { name: "DAP", price: 1200, category: "fertilizer", type: "inorganic", nutrient: "phosphorus", image: "dap.jpg", stock: 10 },
//   { name: "NPK", price: 900, category: "fertilizer", type: "inorganic", nutrient: "complex", image: "npk.jpg", stock: 8 },
//   { name: "Compost", price: 300, category: "fertilizer", type: "organic", image: "compost.jpg", stock: 6 },
//   { name: "Neem Cake", price: 400, category: "fertilizer", type: "organic", image: "neem-cake.jpg", stock: 4 },
//   { name: "Vermicompost", price: 350, category: "fertilizer", type: "organic", image: "vermicompost.webp", stock: 7 },
//   { name: "Bone Meal", price: 600, category: "fertilizer", type: "organic", image: "bone-meal.jpg", stock: 3 },
//   { name: "Fish Meal", price: 700, category: "fertilizer", type: "organic", image: "fish-meal.jpg", stock: 2 },

//   // 🌿 VEGETABLE SEEDS
//   { name: "Tomato", price: 50, category: "seed", seedType: "vegetable", image: "tomato.jpg", stock: 5 },
//   { name: "Onion", price: 40, category: "seed", seedType: "vegetable", image: "onion.jpg", stock: 6 },
//   { name: "Carrot", price: 30, category: "seed", seedType: "vegetable", image: "carrot.jpg", stock: 4 },
//   { name: "Brinjal", price: 60, category: "seed", seedType: "vegetable", image: "brinjal.jpg", stock: 3 },
//   { name: "Chilli", price: 70, category: "seed", seedType: "vegetable", image: "chilli.jpg", stock: 5 },
//   { name: "Cabbage", price: 45, category: "seed", seedType: "vegetable", image: "cabbage.jpg", stock: 2 },
//   { name: "Beans", price: 55, category: "seed", seedType: "vegetable", image: "beans.jpg", stock: 6 },
//   { name: "Spinach", price: 35, category: "seed", seedType: "vegetable", image: "spinach.jpg", stock: 5 },

//   // 🍎 FRUIT SEEDS
//   { name: "Apple", price: 100, category: "seed", seedType: "fruit", image: "apple.jpg", stock: 3 },
//   { name: "Mango", price: 120, category: "seed", seedType: "fruit", image: "mango.jpg", stock: 4 },
//   { name: "Papaya", price: 90, category: "seed", seedType: "fruit", image: "papaya.jpg", stock: 2 },
//   { name: "Banana", price: 80, category: "seed", seedType: "fruit", image: "banana.png", stock: 6 },
//   { name: "Guava", price: 85, category: "seed", seedType: "fruit", image: "guava.jpg", stock: 3 },
//   { name: "Orange", price: 95, category: "seed", seedType: "fruit", image: "orange.jpg", stock: 5 },
//   { name: "Pomegranate", price: 110, category: "seed", seedType: "fruit", image: "pomegranate.jpg", stock: 2 },
//   { name: "Grapes", price: 130, category: "seed", seedType: "fruit", image: "grapes.jpg", stock: 4 }

// ];


// // ================= CLEAN + VALIDATE =================
// const cleanProducts = products.map(p => ({
//   ...p,
//   stock: p.stock < 0 ? 0 : p.stock // prevent negative
// }));


// // ================= SEED FUNCTION =================
// const seedData = async () => {
//   try {
//     console.log("🧹 Clearing old products...");
//     await AgriProduct.deleteMany();

//     console.log("📦 Inserting new products...");
//     await AgriProduct.insertMany(cleanProducts);

//     console.log("🎉 Products inserted successfully with correct stock!");
//     process.exit();

//   } catch (err) {
//     console.error("❌ Error inserting products:", err);
//     process.exit(1);
//   }
// };


// // ================= RUN =================
// seedData();











const mongoose = require("mongoose");
require("dotenv").config();

const AgriProduct = require("./models/AgriProduct");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ DB Connected"))
  .catch(err => {
    console.error("❌ DB Error:", err);
    process.exit(1);
  });

const products = [

  // ================= INORGANIC FERTILIZERS =================
  { name: "Urea", price: 500, category: "fertilizer", type: "inorganic", nutrient: "nitrogen", image: "urea.jpg", stock: 5 },
  { name: "DAP", price: 1200, category: "fertilizer", type: "inorganic", nutrient: "phosphorus", image: "dap.jpg", stock: 10 },
  { name: "NPK", price: 900, category: "fertilizer", type: "inorganic", nutrient: "potassium", image: "npk.jpg", stock: 8 },
  { name: "Ammonium Nitrate", price: 600, category: "fertilizer", type: "inorganic", nutrient: "nitrogen", image: "ammonium-nitrate.jpg", stock: 6 },
  { name: "Calcium Ammonium Nitrate", price: 650, category: "fertilizer", type: "inorganic", nutrient: "nitrogen", image: "calcium-ammonium-nitrate.jpg", stock: 5 },

  // ================= ORGANIC FERTILIZERS =================
  { name: "Compost", price: 300, category: "fertilizer", type: "organic", image: "compost.jpg", stock: 6 },
  { name: "Neem Cake", price: 400, category: "fertilizer", type: "organic", image: "neem-cake.jpg", stock: 4 },
  { name: "Vermicompost", price: 350, category: "fertilizer", type: "organic", image: "vermicompost.webp", stock: 7 },
  { name: "Bone Meal", price: 600, category: "fertilizer", type: "organic", image: "bone-meal.jpg", stock: 3 },
  { name: "Fish Meal", price: 700, category: "fertilizer", type: "organic", image: "fish-meal.jpg", stock: 2 },

  // ================= BIO FERTILIZERS =================
  { name: "Azotobacter", price: 250, category: "fertilizer", type: "bio", image: "azotobacter.jpg", stock: 6 },
  { name: "Azospirillum", price: 260, category: "fertilizer", type: "bio", image: "azospirillum.jpg", stock: 5 },
  { name: "Rhizobium", price: 270, category: "fertilizer", type: "bio", image: "rhizobium.jpg", stock: 4 },
  { name: "PSB Culture", price: 240, category: "fertilizer", type: "bio", image: "psb.jpg", stock: 5 },
  { name: "Mycorrhiza", price: 300, category: "fertilizer", type: "bio", image: "mycorrhiza.jpg", stock: 5 },

  // ================= NITROGEN BASED =================
  { name: "Neem Coated Urea", price: 520, category: "fertilizer", type: "inorganic", nutrient: "nitrogen", image: "neem-coated-urea.jpg", stock: 6 },
  { name: "Ammonium Sulphate", price: 580, category: "fertilizer", type: "inorganic", nutrient: "nitrogen", image: "ammonium-sulphate.jpg", stock: 5 },
  { name: "Urea Super", price: 540, category: "fertilizer", type: "inorganic", nutrient: "nitrogen", image: "urea.jpg", stock: 5 },
  { name: "Liquid Nitrogen Fertilizer", price: 600, category: "fertilizer", type: "bio", nutrient: "nitrogen", image: "ssp.jpg", stock: 5 },
  { name: "Green Manure", price: 320, category: "fertilizer", type: "organic", nutrient: "nitrogen", image: "green-manure.jpg", stock: 6 },

  // ================= PHOSPHORUS =================
  { name: "SSP", price: 450, category: "fertilizer", type: "inorganic", nutrient: "phosphorus", image: "ssp.jpg", stock: 5 },
  { name: "Bone Powder", price: 480, category: "fertilizer", type: "organic", nutrient: "phosphorus", image: "bone-meal.jpg", stock: 4 },
  { name: "DAP Premium", price: 1300, category: "fertilizer", type: "inorganic", nutrient: "phosphorus", image: "dap.jpg", stock: 6 },
  { name: "Phosphate Rich Organic Manure", price: 500, category: "fertilizer", type: "organic", nutrient: "phosphorus", image: "fym.jpg", stock: 5 },
  { name: "PSB Advanced", price: 300, category: "fertilizer", type: "bio", nutrient: "phosphorus", image: "psb.jpg", stock: 5 },

  // ================= POTASSIUM =================
  { name: "MOP", price: 700, category: "fertilizer", type: "inorganic", nutrient: "potassium", image: "mop.jpg", stock: 5 },
  { name: "Wood Ash", price: 350, category: "fertilizer", type: "organic", nutrient: "potassium", image: "wood-ash.jpg", stock: 6 },
  { name: "SOP", price: 800, category: "fertilizer", type: "inorganic", nutrient: "potassium", image: "sop.webp", stock: 4 },
  { name: "Banana Fertilizer Mix", price: 450, category: "fertilizer", type: "organic", nutrient: "potassium", image: "banana.png", stock: 5 },
  { name: "Potash Bio Mix", price: 400, category: "fertilizer", type: "bio", nutrient: "potassium", image: "psb.jpg", stock: 5 },

  // ================= VEGETABLE SEEDS =================
  { name: "Tomato", price: 50, category: "seed", seedType: "vegetable", image: "tomato.jpg", stock: 5 },
  { name: "Onion", price: 40, category: "seed", seedType: "vegetable", image: "onion.jpg", stock: 6 },
  { name: "Carrot", price: 30, category: "seed", seedType: "vegetable", image: "carrot.jpg", stock: 4 },
  { name: "Brinjal", price: 60, category: "seed", seedType: "vegetable", image: "brinjal.jpg", stock: 3 },
  { name: "Chilli", price: 70, category: "seed", seedType: "vegetable", image: "chilli.jpg", stock: 5 },
  { name: "Cabbage", price: 45, category: "seed", seedType: "vegetable", image: "cabbage.jpg", stock: 2 },
  { name: "Beans", price: 55, category: "seed", seedType: "vegetable", image: "beans.jpg", stock: 6 },
  { name: "Spinach", price: 35, category: "seed", seedType: "vegetable", image: "spinach.jpg", stock: 5 },
  { name: "Pumpkin", price: 65, category: "seed", seedType: "vegetable", image: "pumpkin.jpg", stock: 4 },
  { name: "Cauliflower", price: 50, category: "seed", seedType: "vegetable", image: "cauliflower.jpg", stock: 5 },

  // ================= FRUIT SEEDS =================
  { name: "Apple", price: 100, category: "seed", seedType: "fruit", image: "apple.jpg", stock: 3 },
  { name: "Mango", price: 120, category: "seed", seedType: "fruit", image: "mango.jpg", stock: 4 },
  { name: "Papaya", price: 90, category: "seed", seedType: "fruit", image: "papaya.jpg", stock: 2 },
  { name: "Banana", price: 80, category: "seed", seedType: "fruit", image: "banana.png", stock: 6 },
  { name: "Guava", price: 85, category: "seed", seedType: "fruit", image: "guava.jpg", stock: 3 },
  { name: "Orange", price: 95, category: "seed", seedType: "fruit", image: "orange.jpg", stock: 5 },
  { name: "Pomegranate", price: 110, category: "seed", seedType: "fruit", image: "pomegranate.jpg", stock: 2 },
  { name: "Grapes", price: 130, category: "seed", seedType: "fruit", image: "grapes.jpg", stock: 4 },
  { name: "Strawberry", price: 150, category: "seed", seedType: "fruit", image: "strawberry.jpg", stock: 3 },
  { name: "Watermelon", price: 90, category: "seed", seedType: "fruit", image: "watermelon.jpg", stock: 4 }

];

// CLEAN
const cleanProducts = products.map(p => ({
  ...p,
  stock: p.stock < 0 ? 0 : p.stock
}));

// SEED
const seedData = async () => {
  try {
    await AgriProduct.deleteMany();
    await AgriProduct.insertMany(cleanProducts);
    console.log("🎉 All products inserted successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();