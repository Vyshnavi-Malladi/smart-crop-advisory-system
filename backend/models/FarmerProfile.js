// const mongoose = require("mongoose");

// const farmerProfileSchema = new mongoose.Schema(
// {
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//         unique: true
//     },

//     fullName: {
//         type: String,
//         required: true
//     },

//     mobile: {
//         type: String,
//         default: ""
//     },

//     gender: {
//         type: String,
//         enum: ["Male", "Female", "Other"],
//         default: ""
//     },

//     age: {
//         type: Number,
//         default: null
//     },

//     language: {
//         type: String,
//         default: "en"
//     },

//     profileImage: {
//         type: String,
//         default: ""
//     },

//     state: {
//         type: String,
//         default: ""
//     },

//     district: {
//         type: String,
//         default: ""
//     },

//     village: {
//         type: String,
//         default: ""
//     },

//     pincode: {
//         type: String,
//         default: ""
//     },

//     latitude: {
//         type: Number,
//         default: null
//     },

//     longitude: {
//         type: Number,
//         default: null
//     },

//     farmName: {
//         type: String,
//         default: ""
//     },

//     landArea: {
//         type: Number,
//         default: null
//     },

//     landUnit: {
//         type: String,
//         default: "Acres"
//     },

//     soilType: {
//         type: String,
//         default: ""
//     },

//     irrigationType: {
//         type: String,
//         default: ""
//     },

//     primaryCrop: {
//         type: String,
//         default: ""
//     },

//     secondaryCrop: {
//         type: String,
//         default: ""
//     },

//     farmingType: {
//         type: String,
//         default: ""
//     },

//     farmingExperience: {
//         type: Number,
//         default: null
//     },

//     waterSource: {
//         type: String,
//         default: ""
//     },

//     livestock: {
//         type: String,
//         default: ""
//     },

//     profileCompleted: {
//         type: Boolean,
//         default: false
//     }

// },
// {
//     timestamps: true
// });

// module.exports = mongoose.model(
//     "FarmerProfile",
//     farmerProfileSchema
// );


















// FarmerProfile.js - Update the model
const mongoose = require("mongoose");

const farmerProfileSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    fullName: {
        type: String,
        required: false,  // Changed from true
        default: ""
    },

    mobile: {
        type: String,
        default: ""
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other", ""], // Added empty string
        default: ""
    },

    age: {
        type: Number,
        default: null
    },

    language: {
        type: String,
        default: "en"
    },

    profileImage: {
        type: String,
        default: ""
    },

    state: {
        type: String,
        default: ""
    },

    district: {
        type: String,
        default: ""
    },

    village: {
        type: String,
        default: ""
    },

    pincode: {
        type: String,
        default: ""
    },

    latitude: {
        type: Number,
        default: null
    },

    longitude: {
        type: Number,
        default: null
    },

    farmName: {
        type: String,
        default: ""
    },

    landArea: {
        type: Number,
        default: null
    },

    landUnit: {
        type: String,
        default: "Acres"
    },

    soilType: {
        type: String,
        default: ""
    },

    irrigationType: {
        type: String,
        default: ""
    },

    primaryCrop: {
        type: String,
        default: ""
    },

    secondaryCrop: {
        type: String,
        default: ""
    },

    farmingType: {
        type: String,
        default: ""
    },

    farmingExperience: {
        type: Number,
        default: null
    },

    waterSource: {
        type: String,
        default: ""
    },

    livestock: {
        type: String,
        default: ""
    },

    profileCompleted: {
        type: Boolean,
        default: false
    }

},
{
    timestamps: true
});

module.exports = mongoose.model(
    "FarmerProfile",
    farmerProfileSchema
);