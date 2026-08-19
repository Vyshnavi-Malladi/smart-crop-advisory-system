const mongoose = require("mongoose");

const GrowthSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  sowingDate: String,
  crop: String
});

module.exports = mongoose.model("Growth", GrowthSchema);