// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");
// const AgriProduct = require("../models/AgriProduct");

// // CREATE ORDER
// router.post("/", async (req, res) => {
//   try {
//     const {
//       customer,
//       cart,
//       total,
//       razorpay_order_id,
//       razorpay_payment_id
//     } = req.body;

//     const newOrder = new Order({
//       customer,
//       items: cart.map(item => ({
//         productId: item._id,
//         name: item.name,
//         price: item.price,
//         quantity: 1
//       })),
//       totalAmount: total,
//       razorpay_order_id,
//       razorpay_payment_id
//     });

//     await newOrder.save();

//     // Reduce stock
//     for (let item of cart) {
//       await AgriProduct.findByIdAndUpdate(
//         item._id,
//         { $inc: { stock: -1 } }
//       );
//     }

//     res.json({ success: true });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // GET ALL ORDERS
// router.get("/", async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;










// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");
// const AgriProduct = require("../models/AgriProduct");
// const auth = require("../middleware/auth");

// // ================= CREATE ORDER =================
// router.post("/", auth, async (req, res) => {
//   try {
//     const {
//       customer,
//       cart,
//       total,
//       razorpay_order_id,
//       razorpay_payment_id
//     } = req.body;

//     // Check stock before creating order
//     for (let item of cart) {
//       const product = await AgriProduct.findById(item._id);
//       if (!product || product.stock <= 0) {
//         return res.status(400).json({
//           msg: `Product ${item.name} is out of stock`
//         });
//       }
//     }

//     const newOrder = new Order({
//       user: req.user.id,   // 🔐 Link order to logged-in user
//       customer,
//       items: cart.map(item => ({
//         productId: item._id,
//         name: item.name,
//         price: item.price,
//         quantity: 1
//       })),
//       totalAmount: total,
//       razorpay_order_id,
//       razorpay_payment_id
//     });

//     await newOrder.save();

//     // Reduce stock safely
//     for (let item of cart) {
//       await AgriProduct.findByIdAndUpdate(
//         item._id,
//         { $inc: { stock: -1 } }
//       );
//     }

//     res.json({ success: true });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// // ================= GET MY ORDERS =================
// router.get("/my-orders", auth, async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.user.id })
//       .sort({ createdAt: -1 });

//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// // ================= GET ALL ORDERS (ADMIN) =================
// router.get("/", auth, async (req, res) => {
//   try {
//     if (req.user.role !== "admin")
//       return res.status(403).json({ msg: "Access denied" });

//     const orders = await Order.find()
//       .populate("user", "name email")
//       .sort({ createdAt: -1 });

//     res.json(orders);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// // ================= UPDATE ORDER STATUS (ADMIN) =================
// router.put("/:id/status", auth, async (req, res) => {
//   try {
//     if (req.user.role !== "admin")
//       return res.status(403).json({ msg: "Access denied" });

//     const { status } = req.body;

//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );


//     // ================= UPDATE ORDER STATUS (ADMIN) =================
// router.put("/status/:id", async (req, res) => {
//   try {
//     const { status } = req.body;

//     const updated = await Order.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );

//     res.json({ success: true, order: updated });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
//     res.json(updatedOrder);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;







// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");
// const AgriProduct = require("../models/AgriProduct");
// const auth = require("../middleware/auth");


// // ================= CREATE ORDER =================
// router.post("/", auth, async (req, res) => {
//   try {
//     const {
//       customer,
//       cart,
//       total,
//       razorpay_order_id,
//       razorpay_payment_id
//     } = req.body;

//     // Check stock before creating order
//     for (let item of cart) {
//       const product = await AgriProduct.findById(item._id);
//       if (!product || product.stock <= 0) {
//         return res.status(400).json({
//           msg: `Product ${item.name} is out of stock`
//         });
//       }
//     }

//     const newOrder = new Order({
//       user: req.user.id,   // 🔐 Link order to logged-in user
//       customer,
//       items: cart.map(item => ({
//         productId: item._id,
//         name: item.name,
//         price: item.price,
//         quantity: 1
//       })),
//       totalAmount: total,
//       razorpay_order_id,
//       razorpay_payment_id
//     });

//     await newOrder.save();

//     // Reduce stock safely
//     for (let item of cart) {
//       await AgriProduct.findByIdAndUpdate(
//         item._id,
//         { $inc: { stock: -1 } }
//       );
//     }

//     res.json({ success: true });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// // ================= GET MY ORDERS =================
// router.get("/my-orders", auth, async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.user.id })
//       .sort({ createdAt: -1 });

//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// // ================= GET ALL ORDERS (ADMIN) =================
// router.get("/", auth, async (req, res) => {
//   try {
//     if (req.user.role !== "admin")
//       return res.status(403).json({ msg: "Access denied" });

//     const orders = await Order.find()
//       .populate("user", "name email")
//       .sort({ createdAt: -1 });

//     res.json(orders);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// // ================= UPDATE ORDER STATUS (ADMIN) =================
// router.put("/:id/status", auth, async (req, res) => {
//   try {
//     if (req.user.role !== "admin")
//       return res.status(403).json({ msg: "Access denied" });

//     const { status } = req.body;

//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );

//     res.json(updatedOrder);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;











const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const AgriProduct = require("../models/AgriProduct");
const auth = require("../middleware/auth");


// ================= CREATE ORDER =================
router.post("/", auth, async (req, res) => {

  try {

    const {
      customer,
      cart,
      total,
      razorpay_order_id,
      razorpay_payment_id
    } = req.body;

    // Check stock
    // for (let item of cart) {

    //   const product = await AgriProduct.findById(item._id);

    //   if (!product || product.stock <= 0) {
    //     return res.status(400).json({
    //       msg: `Product ${item.name} is out of stock`
    //     });
    //   }

    // }

    const newOrder = new Order({

      user: req.user.id,

      customer,

      items: cart.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: 1
      })),

      totalAmount: total,

      razorpay_order_id,

      razorpay_payment_id,

      status: "Paid"

    });

    await newOrder.save();

    // Reduce stock
    for (let item of cart) {

      await AgriProduct.findByIdAndUpdate(
        item._id,
        { $inc: { stock: -1 } }
      );

    }

    res.json({ msg: "Order placed successfully" });

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: err.message });

  }

});


// ================= GET MY ORDERS =================
router.get("/my-orders", auth, async (req, res) => {

  try {

    const orders = await Order.find({
      user: req.user.id
    }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: err.message });

  }

});


// ================= GET ALL ORDERS (ADMIN) =================
router.get("/", auth, async (req, res) => {

  try {

    if (req.user.role !== "admin")
      return res.status(403).json({ msg: "Access denied" });

    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: err.message });

  }

});


// ================= UPDATE ORDER STATUS =================
router.put("/status/:id", auth, async (req, res) => {

  try {

    const order = await Order.findById(req.params.id);

    if (!order)
      return res.status(404).json({ msg: "Order not found" });

    const { status } = req.body;


    // ================= ADMIN UPDATE =================
    if (req.user.role === "admin") {

      order.status = status;
      await order.save();

      return res.json(order);

    }


    // ================= USER CANCEL =================
    if (order.user.toString() === req.user.id && status === "Cancelled") {

      if (
        order.status === "Shipped" ||
        order.status === "Delivered"
      ) {
        return res.status(400).json({
          msg: "Order cannot be cancelled"
        });
      }

      order.status = "Cancelled";

      await order.save();


      // Restore stock
      for (let item of order.items) {

        await AgriProduct.findByIdAndUpdate(
          item.productId,
          { $inc: { stock: item.quantity } }
        );

      }

      return res.json(order);

    }

    return res.status(403).json({
      msg: "Action not allowed"
    });

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: err.message });

  }

});

module.exports = router;