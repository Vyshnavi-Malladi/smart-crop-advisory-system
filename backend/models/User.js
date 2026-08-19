// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     location: { type: String, default: 'India' },
//     landArea: { type: Number, default: 0 },
//     createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('User', UserSchema);











// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({

//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },

//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     trim: true
//   },

//   password: {
//     type: String,
//     required: true
//   },

//   role: {
//     type: String,
//     enum: ["user", "admin"],
//     default: "user"
//   },

//   location: {
//     type: String,
//     default: "India"
//   },

//   landArea: {
//     type: Number,
//     default: 0
//   }

// }, { timestamps: true });

// module.exports = mongoose.model('User', UserSchema);












// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     name: { type: String, required: true },

//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },

//     password: {
//         type: String,
//         required: true
//     },

//     location: {
//         type: String,
//         default: 'India'
//     },

//     landArea: {
//         type: Number,
//         default: 0
//     },

//     // 🔥 IMPORTANT FIX
//     phone: {
//         type: String,
//         required: true,
//         unique: true
//     },

//     role: {
//         type: String,
//         enum: ["user", "admin"],
//         default: "user"
//     },

//     createdAt: {
//         type: Date,
//         default: Date.now
//     }

// });

// module.exports = mongoose.model('User', UserSchema);










// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     name: { type: String, required: true },

//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },

//     password: {
//         type: String,
//         required: true
//     },

//     location: {
//         type: String,
//         default: 'India'
//     },

//     landArea: {
//         type: Number,
//         default: 0
//     },

//     phone: {
//         type: String,
//         required: true,
//         unique: true
//     },

//     role: {
//         type: String,
//         enum: ["user", "admin"],
//         default: "user"
//     },

//     // ✅ NEW: Track if user has completed their profile
//     hasCompletedProfile: {
//         type: Boolean,
//         default: false
//     },

//     createdAt: {
//         type: Date,
//         default: Date.now
//     }

// });

// module.exports = mongoose.model('User', UserSchema);













// models/User.js

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // =====================================================
    // BASIC USER INFORMATION
    // =====================================================

    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    // =====================================================
    // FARM INFORMATION
    // =====================================================

    location: {
      type: String,
      default: "India",
      trim: true
    },

    landArea: {
      type: Number,
      default: 0,
      min: 0
    },

    // =====================================================
    // USER ROLE
    // =====================================================

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    // =====================================================
    // PROFILE STATUS
    // =====================================================

    hasCompletedProfile: {
      type: Boolean,
      default: false
    },

    // =====================================================
    // NOTIFICATION SETTINGS
    // =====================================================

    notificationsEnabled: {
      type: Boolean,
      default: true
    },

    // =====================================================
    // ACCOUNT CREATION
    // =====================================================

    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", UserSchema);