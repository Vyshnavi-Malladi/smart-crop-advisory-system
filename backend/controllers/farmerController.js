// const FarmerProfile = require("../models/FarmerProfile");
// const User = require("../models/User");

// // ===============================
// // GET FARMER PROFILE
// // ===============================
// exports.getProfile = async (req, res) => {
//     try {
//         const profile = await FarmerProfile.findOne({
//             user: req.user.id
//         });

//         if (!profile) {
//             return res.status(200).json({
//                 exists: false
//             });
//         }

//         return res.status(200).json({
//             exists: true,
//             profile
//         });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             msg: "Server Error"
//         });
//     }
// };

// // ===============================
// // CREATE / UPDATE PROFILE
// // ===============================
// exports.saveProfile = async (req, res) => {
//     try {

//         const {
//             fullName,
//             mobile,
//             gender,
//             age,
//             language,
//             profileImage,
//             state,
//             district,
//             village,
//             pincode,
//             latitude,
//             longitude,
//             farmName,
//             landArea,
//             landUnit,
//             soilType,
//             irrigationType,
//             primaryCrop,
//             secondaryCrop,
//             farmingType,
//             farmingExperience,
//             waterSource,
//             livestock
//         } = req.body;

//         let profile = await FarmerProfile.findOne({
//             user: req.user.id
//         });

//         if (!profile) {

//             profile = new FarmerProfile({
//                 user: req.user.id,
//                 fullName,
//                 mobile,
//                 gender,
//                 age,
//                 language,
//                 profileImage,
//                 state,
//                 district,
//                 village,
//                 pincode,
//                 latitude,
//                 longitude,
//                 farmName,
//                 landArea,
//                 landUnit,
//                 soilType,
//                 irrigationType,
//                 primaryCrop,
//                 secondaryCrop,
//                 farmingType,
//                 farmingExperience,
//                 waterSource,
//                 livestock,
//                 profileCompleted: true
//             });

//         } else {

//             profile.fullName = fullName;
//             profile.mobile = mobile;
//             profile.gender = gender;
//             profile.age = age;
//             profile.language = language;
//             profile.profileImage = profileImage;
//             profile.state = state;
//             profile.district = district;
//             profile.village = village;
//             profile.pincode = pincode;
//             profile.latitude = latitude;
//             profile.longitude = longitude;
//             profile.farmName = farmName;
//             profile.landArea = landArea;
//             profile.landUnit = landUnit;
//             profile.soilType = soilType;
//             profile.irrigationType = irrigationType;
//             profile.primaryCrop = primaryCrop;
//             profile.secondaryCrop = secondaryCrop;
//             profile.farmingType = farmingType;
//             profile.farmingExperience = farmingExperience;
//             profile.waterSource = waterSource;
//             profile.livestock = livestock;
//             profile.profileCompleted = true;

//         }

//         await profile.save();

//         // Update user's name also
//         await User.findByIdAndUpdate(req.user.id, {
//             name: fullName
//         });

//         res.status(200).json({
//             success: true,
//             msg: "Profile saved successfully",
//             profile
//         });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             msg: "Server Error"
//         });
//     }
// };

// // ===============================
// // CHECK PROFILE COMPLETION
// // ===============================
// exports.checkProfile = async (req, res) => {

//     try {

//         const profile = await FarmerProfile.findOne({
//             user: req.user.id
//         });

//         res.json({
//             completed: profile?.profileCompleted || false
//         });

//     } catch (err) {

//         console.error(err);

//         res.status(500).json({
//             msg: "Server Error"
//         });

//     }

// };

// // ===============================
// // DELETE PROFILE (Optional)
// // ===============================
// exports.deleteProfile = async (req, res) => {

//     try {

//         await FarmerProfile.findOneAndDelete({
//             user: req.user.id
//         });

//         res.json({
//             success: true,
//             msg: "Profile deleted."
//         });

//     } catch (err) {

//         console.error(err);

//         res.status(500).json({
//             msg: "Server Error"
//         });

//     }

// };








// const FarmerProfile = require('../models/FarmerProfile');

// // ===============================
// // GET PROFILE
// // ===============================
// exports.getProfile = async (req, res) => {
//     try {
//         // req.user.id is set by auth middleware
//         const farmer = await FarmerProfile.findOne({ user: req.user.id });
        
//         if (farmer) {
//             res.json({ 
//                 exists: true, 
//                 profile: farmer 
//             });
//         } else {
//             res.json({ 
//                 exists: false 
//             });
//         }
//     } catch (error) {
//         console.error("Error fetching profile:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

// // ===============================
// // CHECK PROFILE COMPLETION
// // ===============================
// exports.checkProfile = async (req, res) => {
//     try {
//         const farmer = await FarmerProfile.findOne({ user: req.user.id });
        
//         if (farmer) {
//             res.json({ 
//                 exists: true, 
//                 profile: farmer,
//                 isComplete: farmer.profileCompleted || false
//             });
//         } else {
//             res.json({ 
//                 exists: false, 
//                 isComplete: false 
//             });
//         }
//     } catch (error) {
//         console.error("Error checking profile:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

// // ===============================
// // CREATE / UPDATE PROFILE
// // ===============================
// exports.saveProfile = async (req, res) => {
//     try {
//         const profileData = req.body;
//         const userId = req.user.id; // From auth middleware
        
//         // Remove language from profile data if present
//         // Language is managed separately
//         delete profileData.language;
        
//         // Check if all required fields are filled
//         const requiredFields = ['fullName', 'mobile', 'state', 'district', 'farmName', 'primaryCrop'];
//         const isComplete = requiredFields.every(field => 
//             profileData[field] && profileData[field].trim && profileData[field].trim() !== ''
//         );
        
//         // Find and update or create new profile
//         const farmer = await FarmerProfile.findOneAndUpdate(
//             { user: userId },
//             { 
//                 ...profileData, 
//                 user: userId,
//                 profileCompleted: isComplete 
//             },
//             { upsert: true, new: true, runValidators: true }
//         );
        
//         res.json({ 
//             success: true, 
//             message: "Profile saved successfully",
//             profile: farmer 
//         });
//     } catch (error) {
//         console.error("Error saving profile:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

// // ===============================
// // ✅ UPDATE LANGUAGE PREFERENCE
// // ===============================
// exports.updateLanguage = async (req, res) => {
//     try {
//         const { language } = req.body;
//         const userId = req.user.id; // From auth middleware
        
//         // Validate language
//         const validLanguages = ['en', 'te', 'hi'];
//         if (!language || !validLanguages.includes(language)) {
//             return res.status(400).json({ 
//                 error: 'Invalid language. Supported: en, te, hi' 
//             });
//         }
        
//         // Find and update farmer's language preference
//         const farmer = await FarmerProfile.findOneAndUpdate(
//             { user: userId },
//             { language: language },
//             { new: true, runValidators: true }
//         );
        
//         if (!farmer) {
//             // If farmer profile doesn't exist, create one with language
//             const newFarmer = new FarmerProfile({
//                 user: userId,
//                 language: language
//             });
//             await newFarmer.save();
            
//             return res.json({ 
//                 success: true, 
//                 message: 'Language updated successfully',
//                 language: language
//             });
//         }
        
//         res.json({ 
//             success: true, 
//             message: 'Language updated successfully',
//             language: farmer.language
//         });
//     } catch (error) {
//         console.error("Error updating language:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

// // ===============================
// // DELETE PROFILE (Optional)
// // ===============================
// exports.deleteProfile = async (req, res) => {
//     try {
//         const userId = req.user.id;
        
//         const farmer = await FarmerProfile.findOneAndDelete({ user: userId });
        
//         if (!farmer) {
//             return res.status(404).json({ 
//                 error: 'Profile not found' 
//             });
//         }
        
//         res.json({ 
//             success: true, 
//             message: 'Profile deleted successfully' 
//         });
//     } catch (error) {
//         console.error("Error deleting profile:", error);
//         res.status(500).json({ error: error.message });
//     }
// };






// const FarmerProfile = require('../models/FarmerProfile');

// // ===============================
// // GET PROFILE
// // ===============================
// exports.getProfile = async (req, res) => {
//     try {
//         const farmer = await FarmerProfile.findOne({ user: req.user.id });
        
//         if (farmer) {
//             res.json({ 
//                 exists: true, 
//                 profile: farmer 
//             });
//         } else {
//             res.json({ 
//                 exists: false 
//             });
//         }
//     } catch (error) {
//         console.error("Error fetching profile:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

// // ===============================
// // CHECK PROFILE COMPLETION
// // ===============================
// exports.checkProfile = async (req, res) => {
//     try {
//         const farmer = await FarmerProfile.findOne({ user: req.user.id });
        
//         if (farmer) {
//             res.json({ 
//                 exists: true, 
//                 profile: farmer,
//                 isComplete: farmer.profileCompleted || false
//             });
//         } else {
//             res.json({ 
//                 exists: false, 
//                 isComplete: false 
//             });
//         }
//     } catch (error) {
//         console.error("Error checking profile:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

// // ===============================
// // CREATE / UPDATE PROFILE
// // ===============================
// exports.saveProfile = async (req, res) => {
//     try {
//         const profileData = req.body;
//         const userId = req.user.id;
        
//         // ✅ Save language if provided, otherwise keep existing
//         // Check if all required fields are filled
//         const requiredFields = ['fullName', 'mobile', 'state', 'district', 'farmName', 'primaryCrop'];
//         const isComplete = requiredFields.every(field => 
//             profileData[field] && profileData[field].trim && profileData[field].trim() !== ''
//         );
        
//         // Find and update or create new profile
//        const farmer = await FarmerProfile.findOneAndUpdate(
//     { user: userId },
//     {
//         ...profileData,
//         language: profileData.language || "en",
//         user: userId,
//         profileCompleted: isComplete
//     },
//     {
//         upsert: true,
//         new: true,
//         runValidators: true
//     }
// );
//         res.json({ 
//             success: true, 
//             message: "Profile saved successfully",
//             profile: farmer 
//         });
//     } catch (error) {
//         console.error("Error saving profile:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

// // ===============================
// // UPDATE LANGUAGE PREFERENCE
// // ===============================
// exports.updateLanguage = async (req, res) => {
//     try {
//         const { language } = req.body;
//         const userId = req.user.id;
        
//         // Validate language
//         const validLanguages = ['en', 'te', 'hi'];
//         if (!language || !validLanguages.includes(language)) {
//             return res.status(400).json({ 
//                 error: 'Invalid language. Supported: en, te, hi' 
//             });
//         }
        
//         // Find and update farmer's language preference
//         const farmer = await FarmerProfile.findOneAndUpdate(
//             { user: userId },
//             { language: language },
//             { new: true, runValidators: true }
//         );
        
//         if (!farmer) {
//             // If farmer profile doesn't exist, create one with language
//             const newFarmer = new FarmerProfile({
//                 user: userId,
//                 language: language
//             });
//             await newFarmer.save();
            
//             return res.json({ 
//                 success: true, 
//                 message: 'Language updated successfully',
//                 language: language
//             });
//         }
        
//         res.json({ 
//             success: true, 
//             message: 'Language updated successfully',
//             language: farmer.language
//         });
//     } catch (error) {
//         console.error("Error updating language:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

// // ===============================
// // DELETE PROFILE (Optional)
// // ===============================
// exports.deleteProfile = async (req, res) => {
//     try {
//         const userId = req.user.id;
        
//         const farmer = await FarmerProfile.findOneAndDelete({ user: userId });
        
//         if (!farmer) {
//             return res.status(404).json({ 
//                 error: 'Profile not found' 
//             });
//         }
        
//         res.json({ 
//             success: true, 
//             message: 'Profile deleted successfully' 
//         });
//     } catch (error) {
//         console.error("Error deleting profile:", error);
//         res.status(500).json({ error: error.message });
//     }
// };
















// const FarmerProfile = require('../models/FarmerProfile');
// const User = require('../models/User');

// // ===============================
// // GET PROFILE
// // ===============================
// exports.getProfile = async (req, res) => {
//     try {
//         const farmer = await FarmerProfile.findOne({ user: req.user.id });
        
//         if (farmer) {
//             res.json({ 
//                 exists: true, 
//                 profile: farmer 
//             });
//         } else {
//             res.json({ 
//                 exists: false 
//             });
//         }
//     } catch (error) {
//         console.error("Error fetching profile:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

// // ===============================
// // CHECK PROFILE COMPLETION
// // ===============================
// exports.checkProfile = async (req, res) => {
//     try {
//         const userId = req.user.id;
        
//         // First check if user has completed profile flag in User model
//         const user = await User.findById(userId);
        
//         if (!user) {
//             return res.status(404).json({ 
//                 exists: false, 
//                 isComplete: false,
//                 message: 'User not found'
//             });
//         }

//         // If user has completed profile flag is true, check if profile exists
//         if (user.hasCompletedProfile) {
//             const farmer = await FarmerProfile.findOne({ user: userId });
//             if (farmer && farmer.profileCompleted) {
//                 return res.json({ 
//                     exists: true, 
//                     profile: farmer,
//                     isComplete: true 
//                 });
//             }
//         }

//         // Check if farmer profile exists but might not have completed flag
//         const farmer = await FarmerProfile.findOne({ user: userId });
        
//         if (farmer && farmer.profileCompleted) {
//             // Update user flag if profile exists but user flag is false
//             await User.findByIdAndUpdate(userId, { hasCompletedProfile: true });
//             return res.json({ 
//                 exists: true, 
//                 profile: farmer,
//                 isComplete: true 
//             });
//         }

//         // Profile doesn't exist or not complete
//         res.json({ 
//             exists: false, 
//             isComplete: false 
//         });
//     } catch (error) {
//         console.error("Error checking profile:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

// // ===============================
// // CREATE / UPDATE PROFILE - FIXED
// // ===============================
// exports.saveProfile = async (req, res) => {
//     try {
//         const profileData = req.body;
//         const userId = req.user.id;
        
//         // Check if all required fields are filled
//         const requiredFields = ['fullName', 'mobile', 'state', 'district', 'farmName', 'primaryCrop'];
//         const isComplete = requiredFields.every(field => 
//             profileData[field] && profileData[field].trim && profileData[field].trim() !== ''
//         );
        
//         // First, check if profile exists
//         let farmer = await FarmerProfile.findOne({ user: userId });
        
//         if (farmer) {
//             // UPDATE existing profile - use findByIdAndUpdate to avoid validation issues
//             // Only update fields that are provided, don't override with empty values
//             const updateData = {};
            
//             // Only add fields that have values
//             Object.keys(profileData).forEach(key => {
//                 if (profileData[key] !== undefined && profileData[key] !== null && profileData[key] !== '') {
//                     updateData[key] = profileData[key];
//                 }
//             });
            
//             // Always set these
//             updateData.language = profileData.language || "en";
//             updateData.profileCompleted = isComplete;
            
//             // Update the profile
//             farmer = await FarmerProfile.findByIdAndUpdate(
//                 farmer._id,
//                 updateData,
//                 { new: true, runValidators: false } // Disable validators to allow partial updates
//             );
//         } else {
//             // CREATE new profile - provide defaults for all fields
//             const newProfileData = {
//                 user: userId,
//                 fullName: profileData.fullName || "",
//                 mobile: profileData.mobile || "",
//                 gender: profileData.gender || "",
//                 age: profileData.age || null,
//                 language: profileData.language || "en",
//                 profileImage: profileData.profileImage || "",
//                 state: profileData.state || "",
//                 district: profileData.district || "",
//                 village: profileData.village || "",
//                 pincode: profileData.pincode || "",
//                 latitude: profileData.latitude || null,
//                 longitude: profileData.longitude || null,
//                 farmName: profileData.farmName || "",
//                 landArea: profileData.landArea || null,
//                 landUnit: profileData.landUnit || "Acres",
//                 soilType: profileData.soilType || "",
//                 irrigationType: profileData.irrigationType || "",
//                 primaryCrop: profileData.primaryCrop || "",
//                 secondaryCrop: profileData.secondaryCrop || "",
//                 farmingType: profileData.farmingType || "",
//                 farmingExperience: profileData.farmingExperience || null,
//                 waterSource: profileData.waterSource || "",
//                 livestock: profileData.livestock || "",
//                 profileCompleted: isComplete
//             };
            
//             farmer = new FarmerProfile(newProfileData);
//             await farmer.save();
//         }

//         // ✅ Update User model with profile completion flag
//         await User.findByIdAndUpdate(userId, { 
//             hasCompletedProfile: isComplete 
//         });

//         res.json({ 
//             success: true, 
//             message: "Profile saved successfully",
//             profile: farmer,
//             isComplete: isComplete
//         });
//     } catch (error) {
//         console.error("Error saving profile:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

// // ===============================
// // UPDATE LANGUAGE PREFERENCE
// // ===============================
// exports.updateLanguage = async (req, res) => {
//     try {
//         const { language } = req.body;
//         const userId = req.user.id;
        
//         // Validate language
//         const validLanguages = ['en', 'te', 'hi'];
//         if (!language || !validLanguages.includes(language)) {
//             return res.status(400).json({ 
//                 error: 'Invalid language. Supported: en, te, hi' 
//             });
//         }
        
//         // Find and update farmer's language preference
//         const farmer = await FarmerProfile.findOneAndUpdate(
//             { user: userId },
//             { language: language },
//             { new: true, runValidators: false }
//         );
        
//         if (!farmer) {
//             // If farmer profile doesn't exist, create one with language
//             const newFarmer = new FarmerProfile({
//                 user: userId,
//                 language: language
//             });
//             await newFarmer.save();
            
//             return res.json({ 
//                 success: true, 
//                 message: 'Language updated successfully',
//                 language: language
//             });
//         }
        
//         res.json({ 
//             success: true, 
//             message: 'Language updated successfully',
//             language: farmer.language
//         });
//     } catch (error) {
//         console.error("Error updating language:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

// // ===============================
// // DELETE PROFILE (Optional)
// // ===============================
// exports.deleteProfile = async (req, res) => {
//     try {
//         const userId = req.user.id;
        
//         const farmer = await FarmerProfile.findOneAndDelete({ user: userId });
        
//         if (!farmer) {
//             return res.status(404).json({ 
//                 error: 'Profile not found' 
//             });
//         }

//         // ✅ Update User model - reset profile completion flag
//         await User.findByIdAndUpdate(userId, { 
//             hasCompletedProfile: false 
//         });
        
//         res.json({ 
//             success: true, 
//             message: 'Profile deleted successfully' 
//         });
//     } catch (error) {
//         console.error("Error deleting profile:", error);
//         res.status(500).json({ error: error.message });
//     }
// };






















// const FarmerProfile = require("../models/FarmerProfile");
// const User = require("../models/User");

// // ============================================================
// // GET PROFILE
// // ============================================================
// exports.getProfile = async (req, res) => {
//     try {
//         const userId = req.user.id;

//         const farmer = await FarmerProfile.findOne({
//             user: userId
//         });

//         if (farmer) {
//             return res.json({
//                 exists: true,
//                 profile: farmer
//             });
//         }

//         return res.json({
//             exists: false,
//             profile: null
//         });

//     } catch (error) {
//         console.error("Error fetching profile:", error);

//         return res.status(500).json({
//             success: false,
//             error: error.message
//         });
//     }
// };


// // ============================================================
// // CHECK PROFILE COMPLETION
// // ============================================================
// exports.checkProfile = async (req, res) => {
//     try {
//         const userId = req.user.id;

//         // --------------------------------------------------------
//         // Get User
//         // --------------------------------------------------------
//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({
//                 exists: false,
//                 isComplete: false,
//                 hasCompletedProfile: false,
//                 message: "User not found"
//             });
//         }

//         // --------------------------------------------------------
//         // Get Farmer Profile
//         // --------------------------------------------------------
//         const farmer = await FarmerProfile.findOne({
//             user: userId
//         });

//         // --------------------------------------------------------
//         // CASE 1:
//         // User has completed or skipped profile
//         // --------------------------------------------------------
//         if (user.hasCompletedProfile === true) {

//             // If actual farmer profile exists and is complete
//             if (farmer && farmer.profileCompleted === true) {
//                 return res.json({
//                     exists: true,
//                     profile: farmer,
//                     isComplete: true,
//                     hasCompletedProfile: true,
//                     skipped: false
//                 });
//             }

//             // User skipped profile
//             return res.json({
//                 exists: false,
//                 profile: null,
//                 isComplete: true,
//                 hasCompletedProfile: true,
//                 skipped: true
//             });
//         }

//         // --------------------------------------------------------
//         // CASE 2:
//         // Farmer profile exists and is complete,
//         // but User flag was not updated
//         // --------------------------------------------------------
//         if (
//             farmer &&
//             farmer.profileCompleted === true
//         ) {

//             await User.findByIdAndUpdate(
//                 userId,
//                 {
//                     hasCompletedProfile: true
//                 }
//             );

//             return res.json({
//                 exists: true,
//                 profile: farmer,
//                 isComplete: true,
//                 hasCompletedProfile: true,
//                 skipped: false
//             });
//         }

//         // --------------------------------------------------------
//         // CASE 3:
//         // Farmer profile exists but is incomplete
//         // --------------------------------------------------------
//         if (farmer) {
//             return res.json({
//                 exists: true,
//                 profile: farmer,
//                 isComplete: false,
//                 hasCompletedProfile: false,
//                 skipped: false
//             });
//         }

//         // --------------------------------------------------------
//         // CASE 4:
//         // No profile and not skipped
//         // --------------------------------------------------------
//         return res.json({
//             exists: false,
//             profile: null,
//             isComplete: false,
//             hasCompletedProfile: false,
//             skipped: false
//         });

//     } catch (error) {
//         console.error("Error checking profile:", error);

//         return res.status(500).json({
//             success: false,
//             error: error.message
//         });
//     }
// };


// // ============================================================
// // CREATE / UPDATE PROFILE
// // ============================================================
// exports.saveProfile = async (req, res) => {
//     try {
//         const profileData = req.body;
//         const userId = req.user.id;

//         // --------------------------------------------------------
//         // Required fields
//         // --------------------------------------------------------
//         const requiredFields = [
//             "fullName",
//             "mobile",
//             "state",
//             "district",
//             "farmName",
//             "primaryCrop"
//         ];

//         // --------------------------------------------------------
//         // Check profile completion
//         // --------------------------------------------------------
//         const isComplete = requiredFields.every((field) => {
//             const value = profileData[field];

//             return (
//                 value !== undefined &&
//                 value !== null &&
//                 String(value).trim() !== ""
//             );
//         });

//         // --------------------------------------------------------
//         // Find existing farmer profile
//         // --------------------------------------------------------
//         let farmer = await FarmerProfile.findOne({
//             user: userId
//         });

//         // ========================================================
//         // UPDATE EXISTING PROFILE
//         // ========================================================
//         if (farmer) {

//             const updateData = {};

//             // ----------------------------------------------------
//             // Update only values that were actually provided
//             // ----------------------------------------------------
//             Object.keys(profileData).forEach((key) => {

//                 const value = profileData[key];

//                 if (
//                     value !== undefined &&
//                     value !== null &&
//                     value !== ""
//                 ) {
//                     updateData[key] = value;
//                 }
//             });

//             // ----------------------------------------------------
//             // Always update language
//             // ----------------------------------------------------
//             updateData.language =
//                 profileData.language || farmer.language || "en";

//             // ----------------------------------------------------
//             // Update completion status
//             // ----------------------------------------------------
//             updateData.profileCompleted = isComplete;

//             // ----------------------------------------------------
//             // Save changes
//             // ----------------------------------------------------
//             farmer = await FarmerProfile.findByIdAndUpdate(
//                 farmer._id,
//                 updateData,
//                 {
//                     new: true,
//                     runValidators: false
//                 }
//             );
//         }

//         // ========================================================
//         // CREATE NEW PROFILE
//         // ========================================================
//         else {

//             const newProfileData = {
//                 user: userId,

//                 fullName:
//                     profileData.fullName || "",

//                 mobile:
//                     profileData.mobile || "",

//                 gender:
//                     profileData.gender || "",

//                 age:
//                     profileData.age || null,

//                 language:
//                     profileData.language || "en",

//                 profileImage:
//                     profileData.profileImage || "",

//                 state:
//                     profileData.state || "",

//                 district:
//                     profileData.district || "",

//                 village:
//                     profileData.village || "",

//                 pincode:
//                     profileData.pincode || "",

//                 latitude:
//                     profileData.latitude || null,

//                 longitude:
//                     profileData.longitude || null,

//                 farmName:
//                     profileData.farmName || "",

//                 landArea:
//                     profileData.landArea || null,

//                 landUnit:
//                     profileData.landUnit || "Acres",

//                 soilType:
//                     profileData.soilType || "",

//                 irrigationType:
//                     profileData.irrigationType || "",

//                 primaryCrop:
//                     profileData.primaryCrop || "",

//                 secondaryCrop:
//                     profileData.secondaryCrop || "",

//                 farmingType:
//                     profileData.farmingType || "",

//                 farmingExperience:
//                     profileData.farmingExperience || null,

//                 waterSource:
//                     profileData.waterSource || "",

//                 livestock:
//                     profileData.livestock || "",

//                 profileCompleted:
//                     isComplete
//             };

//             farmer = new FarmerProfile(newProfileData);

//             await farmer.save();
//         }

//         // ========================================================
//         // UPDATE USER PROFILE COMPLETION FLAG
//         // ========================================================
//         await User.findByIdAndUpdate(
//             userId,
//             {
//                 hasCompletedProfile: isComplete
//             }
//         );

//         // ========================================================
//         // RESPONSE
//         // ========================================================
//         return res.json({
//             success: true,
//             message: "Profile saved successfully",
//             profile: farmer,
//             isComplete: isComplete,
//             hasCompletedProfile: isComplete
//         });

//     } catch (error) {
//         console.error("Error saving profile:", error);

//         return res.status(500).json({
//             success: false,
//             error: error.message
//         });
//     }
// };


// // ============================================================
// // SKIP PROFILE
// // ============================================================
// exports.skipProfile = async (req, res) => {
//     try {
//         const userId = req.user.id;

//         // --------------------------------------------------------
//         // Verify user exists
//         // --------------------------------------------------------
//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 error: "User not found"
//             });
//         }

//         // --------------------------------------------------------
//         // Mark profile as completed from the user's perspective.
//         //
//         // No FarmerProfile document is created.
//         // This simply means the onboarding/profile step
//         // has been skipped.
//         // --------------------------------------------------------
//         await User.findByIdAndUpdate(
//             userId,
//             {
//                 hasCompletedProfile: true
//             },
//             {
//                 new: true
//             }
//         );

//         return res.json({
//             success: true,
//             message: "Profile skipped successfully",
//             hasCompletedProfile: true,
//             skipped: true
//         });

//     } catch (error) {
//         console.error("Error skipping profile:", error);

//         return res.status(500).json({
//             success: false,
//             error: error.message
//         });
//     }
// };


// // ============================================================
// // UPDATE LANGUAGE PREFERENCE
// // ============================================================
// exports.updateLanguage = async (req, res) => {
//     try {
//         const { language } = req.body;
//         const userId = req.user.id;

//         // --------------------------------------------------------
//         // Supported languages
//         // --------------------------------------------------------
//         const validLanguages = [
//             "en",
//             "te",
//             "hi"
//         ];

//         if (
//             !language ||
//             !validLanguages.includes(language)
//         ) {
//             return res.status(400).json({
//                 success: false,
//                 error: "Invalid language. Supported: en, te, hi"
//             });
//         }

//         // --------------------------------------------------------
//         // Find and update farmer profile
//         // --------------------------------------------------------
//         const farmer =
//             await FarmerProfile.findOneAndUpdate(
//                 {
//                     user: userId
//                 },
//                 {
//                     language: language
//                 },
//                 {
//                     new: true,
//                     runValidators: false
//                 }
//             );

//         // --------------------------------------------------------
//         // If profile doesn't exist, create a minimal profile
//         // --------------------------------------------------------
//         if (!farmer) {

//             const newFarmer = new FarmerProfile({
//                 user: userId,
//                 language: language,
//                 profileCompleted: false
//             });

//             await newFarmer.save();

//             return res.json({
//                 success: true,
//                 message: "Language updated successfully",
//                 language: language
//             });
//         }

//         return res.json({
//             success: true,
//             message: "Language updated successfully",
//             language: farmer.language
//         });

//     } catch (error) {
//         console.error(
//             "Error updating language:",
//             error
//         );

//         return res.status(500).json({
//             success: false,
//             error: error.message
//         });
//     }
// };


// // ============================================================
// // DELETE PROFILE
// // ============================================================
// exports.deleteProfile = async (req, res) => {
//     try {
//         const userId = req.user.id;

//         // --------------------------------------------------------
//         // Delete farmer profile
//         // --------------------------------------------------------
//         const farmer =
//             await FarmerProfile.findOneAndDelete({
//                 user: userId
//             });

//         if (!farmer) {
//             // Even if there is no FarmerProfile document,
//             // reset the User flag.
//             await User.findByIdAndUpdate(
//                 userId,
//                 {
//                     hasCompletedProfile: false
//                 }
//             );

//             return res.status(404).json({
//                 success: false,
//                 error: "Profile not found"
//             });
//         }

//         // --------------------------------------------------------
//         // Reset User completion flag
//         // --------------------------------------------------------
//         await User.findByIdAndUpdate(
//             userId,
//             {
//                 hasCompletedProfile: false
//             }
//         );

//         return res.json({
//             success: true,
//             message: "Profile deleted successfully",
//             hasCompletedProfile: false
//         });

//     } catch (error) {
//         console.error(
//             "Error deleting profile:",
//             error
//         );

//         return res.status(500).json({
//             success: false,
//             error: error.message
//         });
//     }
// };













// controllers/farmerController.js

const FarmerProfile = require("../models/FarmerProfile");
const User = require("../models/User");


// ============================================================
// GET PROFILE
// ============================================================

exports.getProfile = async (req, res) => {
    try {

        const userId = req.user.id;

        const farmer = await FarmerProfile.findOne({
            user: userId
        });

        if (farmer) {

            return res.json({
                exists: true,
                profile: farmer
            });

        }

        return res.json({
            exists: false,
            profile: null
        });

    } catch (error) {

        console.error(
            "Error fetching profile:",
            error
        );

        return res.status(500).json({
            success: false,
            error: error.message
        });

    }
};


// ============================================================
// CHECK PROFILE COMPLETION
// ============================================================

exports.checkProfile = async (req, res) => {
    try {

        const userId = req.user.id;


        // --------------------------------------------------------
        // Get User
        // --------------------------------------------------------

        const user =
            await User.findById(userId);

        if (!user) {

            return res.status(404).json({
                exists: false,
                isComplete: false,
                hasCompletedProfile: false,
                message: "User not found"
            });

        }


        // --------------------------------------------------------
        // Get Farmer Profile
        // --------------------------------------------------------

        const farmer =
            await FarmerProfile.findOne({
                user: userId
            });


        // --------------------------------------------------------
        // CASE 1:
        // User has completed or skipped profile
        // --------------------------------------------------------

        if (
            user.hasCompletedProfile === true
        ) {

            // Actual farmer profile exists
            // and is complete

            if (
                farmer &&
                farmer.profileCompleted === true
            ) {

                return res.json({
                    exists: true,
                    profile: farmer,
                    isComplete: true,
                    hasCompletedProfile: true,
                    skipped: false
                });

            }


            // User skipped profile

            return res.json({
                exists: false,
                profile: null,
                isComplete: true,
                hasCompletedProfile: true,
                skipped: true
            });

        }


        // --------------------------------------------------------
        // CASE 2:
        // Farmer profile exists and is complete,
        // but User flag was not updated
        // --------------------------------------------------------

        if (
            farmer &&
            farmer.profileCompleted === true
        ) {

            await User.findByIdAndUpdate(
                userId,
                {
                    hasCompletedProfile: true
                }
            );


            return res.json({
                exists: true,
                profile: farmer,
                isComplete: true,
                hasCompletedProfile: true,
                skipped: false
            });

        }


        // --------------------------------------------------------
        // CASE 3:
        // Farmer profile exists but is incomplete
        // --------------------------------------------------------

        if (farmer) {

            return res.json({
                exists: true,
                profile: farmer,
                isComplete: false,
                hasCompletedProfile: false,
                skipped: false
            });

        }


        // --------------------------------------------------------
        // CASE 4:
        // No profile and not skipped
        // --------------------------------------------------------

        return res.json({
            exists: false,
            profile: null,
            isComplete: false,
            hasCompletedProfile: false,
            skipped: false
        });

    } catch (error) {

        console.error(
            "Error checking profile:",
            error
        );

        return res.status(500).json({
            success: false,
            error: error.message
        });

    }
};


// ============================================================
// CREATE / UPDATE PROFILE
// ============================================================

exports.saveProfile = async (req, res) => {
    try {

        const profileData = req.body;

        const userId = req.user.id;


        // --------------------------------------------------------
        // Required fields
        // --------------------------------------------------------

        const requiredFields = [
            "fullName",
            "mobile",
            "state",
            "district",
            "farmName",
            "primaryCrop"
        ];


        // --------------------------------------------------------
        // Check profile completion
        // --------------------------------------------------------

        const isComplete =
            requiredFields.every((field) => {

                const value =
                    profileData[field];

                return (
                    value !== undefined &&
                    value !== null &&
                    String(value).trim() !== ""
                );

            });


        // --------------------------------------------------------
        // Find existing farmer profile
        // --------------------------------------------------------

        let farmer =
            await FarmerProfile.findOne({
                user: userId
            });


        // ========================================================
        // UPDATE EXISTING PROFILE
        // ========================================================

        if (farmer) {

            const updateData = {};


            // ----------------------------------------------------
            // Update values actually provided
            // ----------------------------------------------------

            Object.keys(profileData).forEach((key) => {

                const value =
                    profileData[key];

                if (
                    value !== undefined &&
                    value !== null &&
                    value !== ""
                ) {

                    updateData[key] =
                        value;

                }

            });


            // ----------------------------------------------------
            // Always update language
            // ----------------------------------------------------

            updateData.language =
                profileData.language ||
                farmer.language ||
                "en";


            // ----------------------------------------------------
            // Update completion status
            // ----------------------------------------------------

            updateData.profileCompleted =
                isComplete;


            // ----------------------------------------------------
            // Save FarmerProfile
            // ----------------------------------------------------

            farmer =
                await FarmerProfile.findByIdAndUpdate(
                    farmer._id,
                    updateData,
                    {
                        new: true,
                        runValidators: false
                    }
                );

        }


        // ========================================================
        // CREATE NEW PROFILE
        // ========================================================

        else {

            const newProfileData = {

                user: userId,


                // ------------------------------------------------
                // Basic information
                // ------------------------------------------------

                fullName:
                    profileData.fullName || "",

                mobile:
                    profileData.mobile || "",

                gender:
                    profileData.gender || "",

                age:
                    profileData.age !== undefined &&
                    profileData.age !== null &&
                    profileData.age !== ""
                        ? Number(profileData.age)
                        : null,


                // ------------------------------------------------
                // Language
                // ------------------------------------------------

                language:
                    profileData.language || "en",


                // ------------------------------------------------
                // Profile image
                // ------------------------------------------------

                profileImage:
                    profileData.profileImage || "",


                // ------------------------------------------------
                // Location
                // ------------------------------------------------

                state:
                    profileData.state || "",

                district:
                    profileData.district || "",

                village:
                    profileData.village || "",

                pincode:
                    profileData.pincode || "",


                // ------------------------------------------------
                // Coordinates
                // ------------------------------------------------

                latitude:
                    profileData.latitude !== undefined &&
                    profileData.latitude !== null &&
                    profileData.latitude !== ""
                        ? Number(profileData.latitude)
                        : null,

                longitude:
                    profileData.longitude !== undefined &&
                    profileData.longitude !== null &&
                    profileData.longitude !== ""
                        ? Number(profileData.longitude)
                        : null,


                // ------------------------------------------------
                // Farm information
                // ------------------------------------------------

                farmName:
                    profileData.farmName || "",

                landArea:
                    profileData.landArea !== undefined &&
                    profileData.landArea !== null &&
                    profileData.landArea !== ""
                        ? Number(profileData.landArea)
                        : null,

                landUnit:
                    profileData.landUnit || "Acres",


                // ------------------------------------------------
                // Soil / irrigation
                // ------------------------------------------------

                soilType:
                    profileData.soilType || "",

                irrigationType:
                    profileData.irrigationType || "",

                waterSource:
                    profileData.waterSource || "",


                // ------------------------------------------------
                // Crops
                // ------------------------------------------------

                primaryCrop:
                    profileData.primaryCrop || "",

                secondaryCrop:
                    profileData.secondaryCrop || "",


                // ------------------------------------------------
                // Farming information
                // ------------------------------------------------

                farmingType:
                    profileData.farmingType || "",

                farmingExperience:
                    profileData.farmingExperience !== undefined &&
                    profileData.farmingExperience !== null &&
                    profileData.farmingExperience !== ""
                        ? Number(profileData.farmingExperience)
                        : null,


                // ------------------------------------------------
                // Livestock
                // ------------------------------------------------

                livestock:
                    profileData.livestock || "",


                // ------------------------------------------------
                // Completion
                // ------------------------------------------------

                profileCompleted:
                    isComplete

            };


            farmer =
                new FarmerProfile(
                    newProfileData
                );


            await farmer.save();

        }


        // ========================================================
        // UPDATE USER DOCUMENT
        // ========================================================
        //
        // Settings.jsx gets user information from /auth/me.
        //
        // /auth/me reads:
        //
        // User.name
        // User.phone
        // User.location
        // User.landArea
        //
        // Therefore we synchronize these fields here.
        // ========================================================

        const userUpdate = {

            hasCompletedProfile:
                isComplete

        };


        // --------------------------------------------------------
        // UPDATE USER NAME
        // FarmerProfile.fullName → User.name
        // --------------------------------------------------------

        if (
            profileData.fullName !== undefined &&
            profileData.fullName !== null &&
            String(profileData.fullName).trim() !== ""
        ) {

            userUpdate.name =
                String(
                    profileData.fullName
                ).trim();

        }


        // --------------------------------------------------------
        // UPDATE USER PHONE
        // FarmerProfile.mobile → User.phone
        // --------------------------------------------------------

        if (
            profileData.mobile !== undefined &&
            profileData.mobile !== null &&
            String(profileData.mobile).trim() !== ""
        ) {

            userUpdate.phone =
                String(
                    profileData.mobile
                ).trim();

        }


        // --------------------------------------------------------
        // UPDATE USER LOCATION
        //
        // We use:
        //
        // District, State
        //
        // Example:
        // Kakinada, Andhra Pradesh
        // --------------------------------------------------------

        const locationParts = [

            profileData.district,

            profileData.state

        ].filter(
            (value) =>
                value !== undefined &&
                value !== null &&
                String(value).trim() !== ""
        );


        if (
            locationParts.length > 0
        ) {

            userUpdate.location =
                locationParts.join(", ");

        }


        // --------------------------------------------------------
        // UPDATE USER LAND AREA
        // FarmerProfile.landArea → User.landArea
        // --------------------------------------------------------

        if (
            profileData.landArea !== undefined &&
            profileData.landArea !== null &&
            profileData.landArea !== ""
        ) {

            userUpdate.landArea =
                Number(
                    profileData.landArea
                );

        }


        // --------------------------------------------------------
        // SAVE USER
        // --------------------------------------------------------

        await User.findByIdAndUpdate(
            userId,
            userUpdate,
            {
                new: true,
                runValidators: true
            }
        );


        // ========================================================
        // RESPONSE
        // ========================================================

        return res.json({

            success: true,

            message:
                "Profile saved successfully",

            profile:
                farmer,

            isComplete:
                isComplete,

            hasCompletedProfile:
                isComplete

        });

    } catch (error) {

        console.error(
            "Error saving profile:",
            error
        );


        // --------------------------------------------------------
        // Duplicate phone number
        // --------------------------------------------------------

        if (
            error.code === 11000 &&
            error.keyPattern?.phone
        ) {

            return res.status(400).json({

                success: false,

                error:
                    "This phone number is already registered with another account."

            });

        }


        return res.status(500).json({

            success: false,

            error:
                error.message

        });

    }
};


// ============================================================
// SKIP PROFILE
// ============================================================

exports.skipProfile = async (req, res) => {
    try {

        const userId = req.user.id;


        // --------------------------------------------------------
        // Verify user exists
        // --------------------------------------------------------

        const user =
            await User.findById(userId);

        if (!user) {

            return res.status(404).json({

                success: false,

                error:
                    "User not found"

            });

        }


        // --------------------------------------------------------
        // Mark profile as completed from user's perspective
        //
        // No FarmerProfile document is created.
        // --------------------------------------------------------

        await User.findByIdAndUpdate(
            userId,
            {
                hasCompletedProfile: true
            },
            {
                new: true
            }
        );


        return res.json({

            success: true,

            message:
                "Profile skipped successfully",

            hasCompletedProfile:
                true,

            skipped:
                true

        });

    } catch (error) {

        console.error(
            "Error skipping profile:",
            error
        );


        return res.status(500).json({

            success: false,

            error:
                error.message

        });

    }
};


// ============================================================
// UPDATE LANGUAGE PREFERENCE
// ============================================================

exports.updateLanguage = async (req, res) => {
    try {

        const {
            language
        } = req.body;

        const userId =
            req.user.id;


        // --------------------------------------------------------
        // Supported languages
        // --------------------------------------------------------

        const validLanguages = [
            "en",
            "te",
            "hi"
        ];


        if (
            !language ||
            !validLanguages.includes(
                language
            )
        ) {

            return res.status(400).json({

                success: false,

                error:
                    "Invalid language. Supported: en, te, hi"

            });

        }


        // --------------------------------------------------------
        // Find and update farmer profile
        // --------------------------------------------------------

        const farmer =
            await FarmerProfile.findOneAndUpdate(
                {
                    user: userId
                },
                {
                    language: language
                },
                {
                    new: true,
                    runValidators: false
                }
            );


        // --------------------------------------------------------
        // If profile doesn't exist,
        // create minimal profile
        // --------------------------------------------------------

        if (!farmer) {

            const newFarmer =
                new FarmerProfile({

                    user:
                        userId,

                    language:
                        language,

                    profileCompleted:
                        false

                });


            await newFarmer.save();


            return res.json({

                success: true,

                message:
                    "Language updated successfully",

                language:
                    language

            });

        }


        return res.json({

            success: true,

            message:
                "Language updated successfully",

            language:
                farmer.language

        });

    } catch (error) {

        console.error(
            "Error updating language:",
            error
        );


        return res.status(500).json({

            success: false,

            error:
                error.message

        });

    }
};


// ============================================================
// DELETE PROFILE
// ============================================================

exports.deleteProfile = async (req, res) => {
    try {

        const userId =
            req.user.id;


        // --------------------------------------------------------
        // Delete farmer profile
        // --------------------------------------------------------

        const farmer =
            await FarmerProfile.findOneAndDelete({
                user: userId
            });


        if (!farmer) {

            // Even if there is no FarmerProfile,
            // reset User completion flag.

            await User.findByIdAndUpdate(
                userId,
                {
                    hasCompletedProfile:
                        false
                }
            );


            return res.status(404).json({

                success: false,

                error:
                    "Profile not found"

            });

        }


        // --------------------------------------------------------
        // Reset User completion flag
        // --------------------------------------------------------

        await User.findByIdAndUpdate(
            userId,
            {
                hasCompletedProfile:
                    false
            }
        );


        return res.json({

            success: true,

            message:
                "Profile deleted successfully",

            hasCompletedProfile:
                false

        });

    } catch (error) {

        console.error(
            "Error deleting profile:",
            error
        );


        return res.status(500).json({

            success: false,

            error:
                error.message

        });

    }
};