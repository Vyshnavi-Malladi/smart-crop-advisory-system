// // require('dotenv').config();   // VERY IMPORTANT – must be first

// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');

// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Connect Database
// // mongoose.connect(process.env.MONGO_URI)
// //     .then(() => console.log('MongoDB Connected'))
// //     .catch(err => {
// //         console.error('MongoDB Connection Error:', err);
// //         process.exit(1);
// //     });

// // // Routes
// // app.use('/api/auth', require('./routes/auth'));
// // app.use('/api/ml', require('./routes/ml'));
// // app.use('/api/weather', require('./routes/weather'));
// // app.use('/api/store', require('./routes/store'));
// // app.use('/api/payment', require('./routes/payment'));
// // app.use('/api/orders', require('./routes/order'));
// // app.use('/api/chatbot', require('./routes/chatbot'));

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server started on port ${PORT}`));






// require('dotenv').config();   // MUST be first

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();

// // ================= MIDDLEWARE =================
// app.use(cors());
// app.use(express.json());

// // ================= DATABASE CONNECTION =================
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB Connected'))
// .catch(err => {
//     console.error('MongoDB Connection Error:', err);
//     process.exit(1);
// });

// // ================= ROUTES =================
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/ml', require('./routes/ml'));
// app.use('/api/weather', require('./routes/weather'));
// app.use('/api/store', require('./routes/store'));
// app.use('/api/payment', require('./routes/payment'));
// app.use('/api/orders', require('./routes/order'));
// app.use('/api/chatbot', require('./routes/chatbot'));

// // ================= SERVER =================
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
// });




// require('dotenv').config();   // MUST be first

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();

// // ================= MIDDLEWARE =================
// app.use(cors());
// app.use(express.json());

// // ================= DATABASE CONNECTION =================
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('✅ MongoDB Connected');
//   })
//   .catch(err => {
//     console.error('❌ MongoDB Connection Error:', err);
//     process.exit(1);
//   });

// // ================= ROUTES =================
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/ml', require('./routes/ml'));
// app.use('/api/weather', require('./routes/weather'));
// app.use('/api/store', require('./routes/store'));
// app.use('/api/payment', require('./routes/payment'));
// app.use('/api/orders', require('./routes/order'));
// app.use('/api/chatbot', require('./routes/chatbot'));

// // ================= GLOBAL ERROR HANDLER =================
// app.use((err, req, res, next) => {
//   console.error('Server Error:', err.stack);
//   res.status(500).json({ error: 'Something went wrong!' });
// });

// // ================= SERVER =================
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server started on port ${PORT}`);
// });








// require('dotenv').config();   // MUST be first

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();

// // ================= MIDDLEWARE =================
// app.use(cors());
// app.use(express.json());

// // ================= DATABASE CONNECTION =================
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('✅ MongoDB Connected');
//   })
//   .catch(err => {
//     console.error('❌ MongoDB Connection Error:', err);
//     process.exit(1);
//   });

// // ================= ROUTES =================
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/ml', require('./routes/ml'));
// app.use('/api/weather', require('./routes/weather'));
// app.use('/api/store', require('./routes/store'));
// app.use('/api/payment', require('./routes/payment'));
// app.use('/api/orders', require('./routes/order'));
// app.use("/api/wishlist", require("./routes/wishlist"));
// app.use('/api/chatbot', require('./routes/chatbot'));

// // ✅ NEW CART ROUTE
// app.use('/api/cart', require('./routes/cart'));



// app.use('/api/growth', require('./routes/growth'));


// // ================= GLOBAL ERROR HANDLER =================
// app.use((err, req, res, next) => {
//   console.error('Server Error:', err.stack);
//   res.status(500).json({ error: 'Something went wrong!' });
// });

// // ================= SERVER =================
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server started on port ${PORT}`);
// });







// require('dotenv').config();   // MUST be first

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();

// // ================= MIDDLEWARE =================
// app.use(cors());
// app.use(express.json());

// // ================= DATABASE CONNECTION =================
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('✅ MongoDB Connected');
//   })
//   .catch(err => {
//     console.error('❌ MongoDB Connection Error:', err);
//     process.exit(1);
//   });

// // ================= ROUTES =================
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/ml', require('./routes/ml'));
// app.use('/api/weather', require('./routes/weather'));
// app.use('/api/store', require('./routes/store'));
// app.use('/api/payment', require('./routes/payment'));
// app.use('/api/orders', require('./routes/order'));
// app.use('/api/wishlist', require('./routes/wishlist'));
// app.use('/api/chatbot', require('./routes/chatbot'));
// app.use('/api/cart', require('./routes/cart'));
// app.use('/api/growth', require('./routes/growth'));

// // ✅ NEW FARMER PROFILE ROUTE
// app.use('/api/farmer', require('./routes/farmer'));
// app.use('/api/soil-centers', require('./routes/soilCenters'));
// // ================= GLOBAL ERROR HANDLER =================
// app.use((err, req, res, next) => {
//   console.error('Server Error:', err.stack);
//   res.status(500).json({
//     error: 'Something went wrong!'
//   });
// });

// // ================= SERVER =================
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server started on port ${PORT}`);
// });









require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ==========================================================
   MIDDLEWARE
========================================================== */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/* ==========================================================
   DATABASE
========================================================== */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed");
    console.error(err.message);
    process.exit(1);
  });

/* ==========================================================
   HOME ROUTE
========================================================== */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🌱 FarmXpert Backend Running Successfully"
  });
});

/* ==========================================================
   API ROUTES
========================================================== */

app.use("/api/auth", require("./routes/auth"));

app.use("/api/ml", require("./routes/ml"));

app.use("/api/weather", require("./routes/weather"));

app.use("/api/store", require("./routes/store"));

app.use("/api/payment", require("./routes/payment"));

app.use("/api/orders", require("./routes/order"));

app.use("/api/wishlist", require("./routes/wishlist"));

app.use("/api/chatbot", require("./routes/chatbot"));

app.use("/api/cart", require("./routes/cart"));

app.use("/api/growth", require("./routes/growth"));

app.use("/api/farmer", require("./routes/farmer"));

/* ==========================================================
   SOIL TESTING CENTERS
========================================================== */

app.use("/api/soil-centers", require("./routes/soilCenters"));

/* ==========================================================
   404 ROUTE
========================================================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found"
  });
});

/* ==========================================================
   GLOBAL ERROR HANDLER
========================================================== */

app.use((err, req, res, next) => {

  console.error("❌ Server Error");

  console.error(err);

  res.status(500).json({

    success: false,

    message: "Internal Server Error"

  });

});

/* ==========================================================
   SERVER
========================================================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log("========================================");

  console.log(`🚀 Server Running on Port ${PORT}`);

  console.log(`🌍 http://localhost:${PORT}`);

  console.log("========================================");

});