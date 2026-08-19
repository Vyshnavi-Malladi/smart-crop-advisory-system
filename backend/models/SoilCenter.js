const mongoose = require("mongoose");

/*
==========================================
Review Schema
==========================================
*/

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    comment: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

/*
==========================================
Soil Center Schema
==========================================
*/

const soilCenterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    address: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      default: "Not Available"
    },

    latitude: {
      type: Number,
      required: true
    },

    longitude: {
      type: Number,
      required: true
    },

    // GeoJSON Point
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },

      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
      }
    },

    website: {
      type: String,
      default: ""
    },

    operating_hours: {
      type: String,
      default: "9:00 AM - 5:00 PM"
    },

    description: {
      type: String,
      default: ""
    },

    verified: {
      type: Boolean,
      default: true
    },

    rating: {
      type: Number,
      default: 0
    },

    totalRatings: {
      type: Number,
      default: 0
    },

    reviews: [reviewSchema]
  },
  {
    timestamps: true
  }
);

/*
==========================================
Indexes
==========================================
*/

// GeoSpatial Index
soilCenterSchema.index({
  location: "2dsphere"
});

// Text Search Index
soilCenterSchema.index({
  name: "text",
  address: "text",
  description: "text"
});

/*
==========================================
Auto Calculate Rating
==========================================
*/

soilCenterSchema.pre("save", function (next) {

  if (this.reviews.length === 0) {

    this.rating = 0;
    this.totalRatings = 0;

    return next();

  }

  let total = 0;

  this.reviews.forEach(review => {

    total += review.rating;

  });

  this.totalRatings = this.reviews.length;

  this.rating = Number(
    (total / this.reviews.length).toFixed(1)
  );

  next();

});

/*
==========================================
Distance Helper
==========================================
*/

soilCenterSchema.methods.calculateDistance = function (lat, lon) {

  const R = 6371;

  const dLat = (this.latitude - lat) * Math.PI / 180;

  const dLon = (this.longitude - lon) * Math.PI / 180;

  const a =

    Math.sin(dLat / 2) * Math.sin(dLat / 2) +

    Math.cos(lat * Math.PI / 180) *

    Math.cos(this.latitude * Math.PI / 180) *

    Math.sin(dLon / 2) *

    Math.sin(dLon / 2);

  const c =

    2 * Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return Number((R * c).toFixed(2));

};

module.exports = mongoose.model(
  "SoilCenter",
  soilCenterSchema
);