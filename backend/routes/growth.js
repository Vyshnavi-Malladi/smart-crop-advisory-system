// // POST (save/update)
// router.post("/", auth, async (req, res) => {
//   const { sowingDate, crop } = req.body;

//   let data = await Growth.findOne({ user: req.user.id });

//   if (data) {
//     data.sowingDate = sowingDate;
//     data.crop = crop;
//     await data.save();
//   } else {
//     await Growth.create({
//       user: req.user.id,
//       sowingDate,
//       crop
//     });
//   }

//   res.json({ msg: "Saved" });
// });

// // GET (fetch)
// router.get("/", auth, async (req, res) => {
//   try {
//     const data = await Growth.findOne({ user: req.user.id });
//     res.json(data || {});
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // DELETE (reset)
// router.delete("/", auth, async (req, res) => {
//   try {
//     await Growth.deleteOne({ user: req.user.id });
//     res.json({ msg: "Deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });





const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");   // check path
const Growth = require("../models/Growth");   // check path

// ================= POST (save/update) =================
router.post("/", auth, async (req, res) => {
  const { sowingDate, crop } = req.body;

  let data = await Growth.findOne({ user: req.user.id });

  if (data) {
    data.sowingDate = sowingDate;
    data.crop = crop;
    await data.save();
  } else {
    await Growth.create({
      user: req.user.id,
      sowingDate,
      crop
    });
  }

  res.json({ msg: "Saved" });
});

// ================= GET (fetch) =================
router.get("/", auth, async (req, res) => {
  try {
    const data = await Growth.findOne({ user: req.user.id });
    res.json(data || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= DELETE (reset) =================
router.delete("/", auth, async (req, res) => {
  try {
    await Growth.deleteOne({ user: req.user.id });
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ VERY IMPORTANT
module.exports = router;