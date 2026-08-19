// const express = require("express");
// const router = express.Router();

// const {
//     getProfile,
//     saveProfile,
//     checkProfile,
//     deleteProfile
// } = require("../controllers/farmerController");

// // Use the SAME auth middleware used by your cart/order routes
// const auth = require("../middleware/auth");

// // ===============================
// // GET PROFILE
// // ===============================
// router.get("/", auth, getProfile);

// // ===============================
// // CHECK PROFILE COMPLETION
// // ===============================
// router.get("/check", auth, checkProfile);

// // ===============================
// // CREATE / UPDATE PROFILE
// // ===============================
// router.post("/", auth, saveProfile);

// // ===============================
// // DELETE PROFILE (Optional)
// // ===============================
// router.delete("/", auth, deleteProfile);

// module.exports = router;






// const express = require("express");
// const router = express.Router();

// const {
//     getProfile,
//     saveProfile,
//     checkProfile,
//     deleteProfile,
//     updateLanguage
// } = require("../controllers/farmerController");

// const auth = require("../middleware/auth");

// // ===============================
// // GET PROFILE
// // ===============================
// router.get("/", auth, getProfile);

// // ===============================
// // CHECK PROFILE COMPLETION
// // ===============================
// router.get("/check", auth, checkProfile);

// // ===============================
// // CREATE / UPDATE PROFILE
// // ===============================
// router.post("/", auth, saveProfile);

// // ===============================
// // UPDATE LANGUAGE PREFERENCE
// // ===============================
// router.post("/language", auth, updateLanguage);

// // ===============================
// // DELETE PROFILE (Optional)
// // ===============================
// router.delete("/", auth, deleteProfile);

// module.exports = router;




















// const express = require("express");
// const router = express.Router();

// const {
//     getProfile,
//     saveProfile,
//     checkProfile,
//     deleteProfile,
//     updateLanguage
// } = require("../controllers/farmerController");

// const auth = require("../middleware/auth");

// // ===============================
// // GET PROFILE
// // ===============================
// router.get("/", auth, getProfile);

// // ===============================
// // CHECK PROFILE COMPLETION
// // ===============================
// router.get("/check", auth, checkProfile);

// // ===============================
// // CREATE / UPDATE PROFILE
// // ===============================
// router.post("/", auth, saveProfile);

// // ===============================
// // UPDATE LANGUAGE PREFERENCE
// // ===============================
// router.post("/language", auth, updateLanguage);

// // ===============================
// // DELETE PROFILE (Optional)
// // ===============================
// router.delete("/", auth, deleteProfile);

// module.exports = router;
















const express = require("express");
const router = express.Router();

const {
    getProfile,
    saveProfile,
    checkProfile,
    deleteProfile,
    updateLanguage,
    skipProfile
} = require("../controllers/farmerController");

const auth = require("../middleware/auth");

// ===============================
// GET PROFILE
// ===============================
router.get("/", auth, getProfile);

// ===============================
// CHECK PROFILE COMPLETION
// ===============================
router.get("/check", auth, checkProfile);

// ===============================
// CREATE / UPDATE PROFILE
// ===============================
router.post("/", auth, saveProfile);

// ===============================
// SKIP PROFILE
// ===============================
router.post("/skip", auth, skipProfile);

// ===============================
// UPDATE LANGUAGE
// ===============================
router.post("/language", auth, updateLanguage);

// ===============================
// DELETE PROFILE
// ===============================
router.delete("/", auth, deleteProfile);

module.exports = router;