const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wishlist = require("../models/Wishlist");
const auth = require("../middleware/auth");

// ================= TOGGLE WISHLIST =================
router.post("/toggle", auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = new mongoose.Types.ObjectId(req.user.id);

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        userId,
        products: [productId]
      });
    } else {
      const exists = wishlist.products.some(
        id => id.toString() === productId
      );

      if (exists) {
        wishlist.products = wishlist.products.filter(
          id => id.toString() !== productId
        );
      } else {
        wishlist.products.push(productId);
      }

      await wishlist.save();
    }

    const updatedWishlist = await Wishlist.findOne({ userId })
      .populate("products");

    res.json({
      products: updatedWishlist.products
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Wishlist error" });
  }
});

// ================= GET WISHLIST =================
router.get("/", auth, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const wishlist = await Wishlist.findOne({ userId })
      .populate("products");

    res.json({
      products: wishlist ? wishlist.products : []
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Wishlist fetch error" });
  }
});

module.exports = router;