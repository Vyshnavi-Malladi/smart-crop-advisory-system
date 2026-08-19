// 📁 routes/cart.js

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Cart = require("../models/Cart");
const AgriProduct = require("../models/AgriProduct");
const auth = require("../middleware/auth");


// ================= ADD TO CART (Increase if Exists) =================
router.post("/add", auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const product = await AgriProduct.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity: 1 }]
      });
    } else {
      const itemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1; // increase quantity
      } else {
        cart.items.push({ productId, quantity: 1 });
      }

      await cart.save();
    }

    const updatedCart = await Cart.findOne({ userId })
      .populate("items.productId");

    res.json({ items: updatedCart.items });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});


// ================= DECREASE QUANTITY =================
router.post("/decrease", auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      if (cart.items[itemIndex].quantity > 1) {
        cart.items[itemIndex].quantity -= 1;
      } else {
        cart.items.splice(itemIndex, 1); // remove if quantity becomes 0
      }
    }

    await cart.save();

    const updatedCart = await Cart.findOne({ userId })
      .populate("items.productId");

    res.json({ items: updatedCart.items });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});


// ================= GET CART =================
router.get("/", auth, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    let cart = await Cart.findOne({ userId })
      .populate("items.productId");

    if (!cart) {
      return res.json({ items: [] });
    }

    // 🔥 Remove broken/null products automatically
    cart.items = cart.items.filter(item => item.productId);

    await cart.save();

    res.json({ items: cart.items });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});


// ================= REMOVE ITEM COMPLETELY =================
router.post("/remove", auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );

    await cart.save();

    const updatedCart = await Cart.findOne({ userId })
      .populate("items.productId");

    res.json({ items: updatedCart.items });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});


// ================= CLEAR CART =================
router.post("/clear", auth, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    await Cart.findOneAndUpdate(
      { userId },
      { items: [] }
    );

    res.json({ items: [] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;