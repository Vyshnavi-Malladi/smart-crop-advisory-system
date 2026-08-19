const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const SoilCenter = require("../models/SoilCenter");

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    const filePath = path.join(__dirname, "../data/soilcenters.json");

    const centers = JSON.parse(
      fs.readFileSync(filePath, "utf8")
    );

    const formattedCenters = centers.map((center) => ({
      name: center.name,
      address: center.address,
      phone: center.phone || "Not Available",

      latitude: Number(center.latitude),
      longitude: Number(center.longitude),

      location: {
        type: "Point",
        coordinates: [
          Number(center.longitude),
          Number(center.latitude)
        ]
      },

      website: center.website || "",

      operating_hours:
        center.operating_hours || "9:00 AM - 5:00 PM",

      description:
        center.description || "",

      verified:
        center.verified ?? true,

      rating: 0,
      totalRatings: 0,
      reviews: []
    }));

    await SoilCenter.deleteMany({});

    await SoilCenter.insertMany(formattedCenters);

    console.log(
      `✅ ${formattedCenters.length} Soil Testing Centers Imported`
    );

    process.exit(0);

  } catch (err) {

    console.error("❌ Import Failed");
    console.error(err);

    process.exit(1);

  }
}

seedDatabase();