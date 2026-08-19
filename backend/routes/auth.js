// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// // Register
// router.post('/register', async (req, res) => {
//     const { name, email, password, location, landArea } = req.body;
//     try {
//         let user = await User.findOne({ email });
//         if (user) return res.status(400).json({ msg: 'User already exists' });

//         user = new User({ name, email, password, location, landArea });

//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(password, salt);

//         await user.save();

//         const payload = { user: { id: user.id } };
//         jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
//             if (err) throw err;
//             res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
//         });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

// // Login
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         let user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

//         const payload = { user: { id: user.id } };
//         jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
//             if (err) throw err;
//             res.json({ token, user: { id: user.id, name: user.name, email: user.email, location: user.location, landArea: user.landArea } });
//         });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

// module.exports = router;






// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// // ================= REGISTER =================
// router.post('/register', async (req, res) => {
//     const { name, email, password, location, landArea } = req.body;

//     try {
//         let user = await User.findOne({ email });
//         if (user)
//             return res.status(400).json({ msg: 'User already exists' });

//         user = new User({
//             name,
//             email,
//             password,
//             location,
//             landArea
//         });

//         // Hash Password
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(password, salt);

//         await user.save();

//         // 🔐 Include role in JWT
//         const payload = {
//             user: {
//                 id: user.id,
//                 role: user.role
//             }
//         };

//         jwt.sign(
//             payload,
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' },
//             (err, token) => {
//                 if (err) throw err;

//                 res.json({
//                     token,
//                     user: {
//                         id: user.id,
//                         name: user.name,
//                         email: user.email,
//                         location: user.location,
//                         landArea: user.landArea,
//                         role: user.role
//                     }
//                 });
//             }
//         );

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });


// // ================= LOGIN =================
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         let user = await User.findOne({ email });
//         if (!user)
//             return res.status(400).json({ msg: 'Invalid Credentials' });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch)
//             return res.status(400).json({ msg: 'Invalid Credentials' });

//         // 🔐 Include role in JWT
//         const payload = {
//             user: {
//                 id: user.id,
//                 role: user.role
//             }
//         };

//         jwt.sign(
//             payload,
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' },
//             (err, token) => {
//                 if (err) throw err;

//                 res.json({
//                     token,
//                     user: {
//                         id: user.id,
//                         name: user.name,
//                         email: user.email,
//                         location: user.location,
//                         landArea: user.landArea,
//                         role: user.role
//                     }
//                 });
//             }
//         );

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

// module.exports = router;
















// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');


// // ================= REGISTER =================
// router.post('/register', async (req, res) => {
//     const { name, email, password, location, landArea } = req.body;

//     try {
//         let user = await User.findOne({ email });
//         if (user)
//             return res.status(400).json({ msg: 'User already exists' });

//         // 🔥 Auto Admin for specific email
//         let role = "user";
//         if (email === "projectadmin@gmail.com") {
//             role = "admin";
//         }

//         // 🔥 Generate unique phone (fix for duplicate index issue)
//         const uniquePhone = Date.now().toString() + Math.floor(Math.random() * 1000);

//         user = new User({
//             name,
//             email,
//             password,
//             location,
//             landArea,
//             role,
//             phone: uniquePhone  // <-- Important fix
//         });

//         // Hash Password
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(password, salt);

//         await user.save();

//         const payload = {
//             user: {
//                 id: user.id,
//                 role: user.role
//             }
//         };

//         jwt.sign(
//             payload,
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' },
//             (err, token) => {
//                 if (err) throw err;

//                 res.json({
//                     token,
//                     user: {
//                         id: user.id,
//                         name: user.name,
//                         email: user.email,
//                         location: user.location,
//                         landArea: user.landArea,
//                         role: user.role
//                     }
//                 });
//             }
//         );

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });


// // ================= LOGIN =================
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         let user = await User.findOne({ email });
//         if (!user)
//             return res.status(400).json({ msg: 'Invalid Credentials' });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch)
//             return res.status(400).json({ msg: 'Invalid Credentials' });

//         const payload = {
//             user: {
//                 id: user.id,
//                 role: user.role
//             }
//         };

//         jwt.sign(
//             payload,
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' },
//             (err, token) => {
//                 if (err) throw err;

//                 res.json({
//                     token,
//                     user: {
//                         id: user.id,
//                         name: user.name,
//                         email: user.email,
//                         location: user.location,
//                         landArea: user.landArea,
//                         role: user.role
//                     }
//                 });
//             }
//         );

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

// module.exports = router;
















// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');


// // ================= REGISTER =================
// router.post('/register', async (req, res) => {
//     const { name, email, password, location, landArea } = req.body;

//     try {
//         let user = await User.findOne({ email });
//         if (user)
//             return res.status(400).json({ msg: 'User already exists' });

//         // 🔥 Auto Admin for specific email
//         let role = "user";
//         if (email === "projectadmin@gmail.com") {
//             role = "admin";
//         }

//         // 🔥 Generate unique phone (fix for duplicate index issue)
//         const uniquePhone = Date.now().toString() + Math.floor(Math.random() * 1000);

//         user = new User({
//             name,
//             email,
//             password,
//             location,
//             landArea,
//             role,
//             phone: uniquePhone
//         });

//         // Hash Password
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(password, salt);

//         await user.save();

//         const payload = {
//             user: {
//                 id: user.id,
//                 role: user.role
//             }
//         };

//         jwt.sign(
//             payload,
//             process.env.JWT_SECRET,
//             { expiresIn: '7d' },   // ✅ changed from 1h to 7d
//             (err, token) => {
//                 if (err) throw err;

//                 res.json({
//                     token,
//                     user: {
//                         id: user.id,
//                         name: user.name,
//                         email: user.email,
//                         location: user.location,
//                         landArea: user.landArea,
//                         role: user.role
//                     }
//                 });
//             }
//         );

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });


// // ================= LOGIN =================
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         let user = await User.findOne({ email });
//         if (!user)
//             return res.status(400).json({ msg: 'Invalid Credentials' });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch)
//             return res.status(400).json({ msg: 'Invalid Credentials' });

//         const payload = {
//             user: {
//                 id: user.id,
//                 role: user.role
//             }
//         };

//         jwt.sign(
//             payload,
//             process.env.JWT_SECRET,
//             { expiresIn: '7d' },   // ✅ changed from 1h to 7d
//             (err, token) => {
//                 if (err) throw err;

//                 res.json({
//                     token,
//                     user: {
//                         id: user.id,
//                         name: user.name,
//                         email: user.email,
//                         location: user.location,
//                         landArea: user.landArea,
//                         role: user.role
//                     }
//                 });
//             }
//         );

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

// module.exports = router;
















// routes/auth.js

const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const auth = require("../middleware/auth");

// ============================================================
// HELPER — SAFE USER DATA
// ============================================================

const getSafeUser = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    location: user.location,
    landArea: user.landArea,
    role: user.role,

    // IMPORTANT:
    // This value comes directly from MongoDB
    hasCompletedProfile: user.hasCompletedProfile === true,

    notificationsEnabled:
        user.notificationsEnabled !== false,

    createdAt: user.createdAt
});


// ============================================================
// REGISTER
// ============================================================

router.post("/register", async (req, res) => {

    const {
        name,
        email,
        password,
        location,
        landArea
    } = req.body;

    try {

        // ------------------------------------------------------
        // VALIDATION
        // ------------------------------------------------------

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                msg: "Name, email and password are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                msg: "Password must contain at least 6 characters"
            });
        }

        const normalizedEmail =
            email.trim().toLowerCase();

        // ------------------------------------------------------
        // CHECK EXISTING USER
        // ------------------------------------------------------

        const existingUser =
            await User.findOne({
                email: normalizedEmail
            });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                msg: "User already exists"
            });
        }

        // ------------------------------------------------------
        // ADMIN
        // ------------------------------------------------------

        let role = "user";

        if (
            normalizedEmail ===
            "projectadmin@gmail.com"
        ) {
            role = "admin";
        }

        // ------------------------------------------------------
        // TEMPORARY UNIQUE PHONE
        // ------------------------------------------------------

        const uniquePhone =
            Date.now().toString() +
            Math.floor(Math.random() * 1000);

        // ------------------------------------------------------
        // CREATE USER
        // ------------------------------------------------------

        const user = new User({

            name: name.trim(),

            email: normalizedEmail,

            password,

            location:
                location?.trim() || "India",

            landArea:
                Number(landArea) || 0,

            role,

            phone: uniquePhone,

            // New users must complete/skip
            // Farmer Profile onboarding.
            hasCompletedProfile: false,

            notificationsEnabled: true
        });

        // ------------------------------------------------------
        // HASH PASSWORD
        // ------------------------------------------------------

        const salt =
            await bcrypt.genSalt(10);

        user.password =
            await bcrypt.hash(
                password,
                salt
            );

        await user.save();

        // ------------------------------------------------------
        // CREATE JWT
        // ------------------------------------------------------

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        const token =
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: "7d"
                }
            );

        // ------------------------------------------------------
        // REGISTER RESPONSE
        // ------------------------------------------------------

        return res.status(201).json({

            success: true,

            token,

            user: getSafeUser(user),

            // Explicitly returned for frontend
            hasCompletedProfile:
                user.hasCompletedProfile === true,

            // New user goes to profile
            isFirstLogin: true,

            redirectTo: "/farmer-profile"
        });

    } catch (err) {

        console.error(
            "Register error:",
            err
        );

        return res.status(500).json({
            success: false,
            msg: "Server error"
        });
    }
});


// ============================================================
// LOGIN
// ============================================================

router.post("/login", async (req, res) => {

    const {
        email,
        password
    } = req.body;

    try {

        // ------------------------------------------------------
        // VALIDATION
        // ------------------------------------------------------

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                msg: "Email and password are required"
            });
        }

        const normalizedEmail =
            email.trim().toLowerCase();

        // ------------------------------------------------------
        // FIND USER
        // ------------------------------------------------------

        const user =
            await User.findOne({
                email: normalizedEmail
            });

        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "Invalid Credentials"
            });
        }

        // ------------------------------------------------------
        // CHECK PASSWORD
        // ------------------------------------------------------

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                msg: "Invalid Credentials"
            });
        }

        // ------------------------------------------------------
        // CREATE JWT
        // ------------------------------------------------------

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        const token =
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: "7d"
                }
            );

        // ------------------------------------------------------
        // READ REAL DATABASE VALUE
        // ------------------------------------------------------

        const hasCompletedProfile =
            user.hasCompletedProfile === true;

        // Admins don't need farmer onboarding.
        const isFirstLogin =
            user.role !== "admin" &&
            !hasCompletedProfile;

        // ------------------------------------------------------
        // LOGIN RESPONSE
        // ------------------------------------------------------

        return res.json({

            success: true,

            token,

            user: getSafeUser(user),

            // IMPORTANT:
            // Login now explicitly returns the
            // MongoDB profile completion status.
            hasCompletedProfile,

            isFirstLogin,

            redirectTo:
                user.role === "admin"
                    ? "/admin-dashboard"
                    : hasCompletedProfile
                        ? "/dashboard"
                        : "/farmer-profile"
        });

    } catch (err) {

        console.error(
            "Login error:",
            err
        );

        return res.status(500).json({
            success: false,
            msg: "Server error"
        });
    }
});


// ============================================================
// GET CURRENT USER
// ============================================================

router.get(
    "/me",
    auth,
    async (req, res) => {

        try {

            const user =
                await User.findById(
                    req.user.id
                ).select("-password");

            if (!user) {
                return res.status(404).json({
                    success: false,
                    msg: "User not found"
                });
            }

            return res.json({

                success: true,

                user: getSafeUser(user),

                hasCompletedProfile:
                    user.hasCompletedProfile === true
            });

        } catch (err) {

            console.error(
                "Get current user error:",
                err
            );

            return res.status(500).json({
                success: false,
                msg: "Server error"
            });
        }
    }
);


// ============================================================
// CHANGE PASSWORD
// ============================================================

router.put(
    "/change-password",
    auth,
    async (req, res) => {

        const {
            currentPassword,
            newPassword
        } = req.body;

        try {

            if (
                !currentPassword ||
                !newPassword
            ) {
                return res.status(400).json({
                    success: false,
                    msg:
                        "Current password and new password are required"
                });
            }

            if (
                newPassword.length < 6
            ) {
                return res.status(400).json({
                    success: false,
                    msg:
                        "New password must contain at least 6 characters"
                });
            }

            const user =
                await User.findById(
                    req.user.id
                );

            if (!user) {
                return res.status(404).json({
                    success: false,
                    msg: "User not found"
                });
            }

            const isMatch =
                await bcrypt.compare(
                    currentPassword,
                    user.password
                );

            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    msg:
                        "Current password is incorrect"
                });
            }

            const isSamePassword =
                await bcrypt.compare(
                    newPassword,
                    user.password
                );

            if (isSamePassword) {
                return res.status(400).json({
                    success: false,
                    msg:
                        "New password must be different from your current password"
                });
            }

            const salt =
                await bcrypt.genSalt(10);

            user.password =
                await bcrypt.hash(
                    newPassword,
                    salt
                );

            await user.save();

            return res.json({
                success: true,
                msg:
                    "Password changed successfully"
            });

        } catch (err) {

            console.error(
                "Change password error:",
                err
            );

            return res.status(500).json({
                success: false,
                msg: "Server error"
            });
        }
    }
);


// ============================================================
// UPDATE NOTIFICATION SETTING
// ============================================================

router.put(
    "/notifications",
    auth,
    async (req, res) => {

        const {
            enabled
        } = req.body;

        try {

            if (
                typeof enabled !== "boolean"
            ) {
                return res.status(400).json({
                    success: false,
                    msg:
                        "Notification value must be true or false"
                });
            }

            const user =
                await User.findById(
                    req.user.id
                );

            if (!user) {
                return res.status(404).json({
                    success: false,
                    msg: "User not found"
                });
            }

            user.notificationsEnabled =
                enabled;

            await user.save();

            return res.json({

                success: true,

                notificationsEnabled:
                    user.notificationsEnabled,

                msg: enabled
                    ? "Notifications enabled"
                    : "Notifications disabled"
            });

        } catch (err) {

            console.error(
                "Notification update error:",
                err
            );

            return res.status(500).json({
                success: false,
                msg: "Server error"
            });
        }
    }
);


// ============================================================
// DELETE ACCOUNT
// ============================================================

router.delete(
    "/delete-account",
    auth,
    async (req, res) => {

        try {

            const user =
                await User.findById(
                    req.user.id
                );

            if (!user) {
                return res.status(404).json({
                    success: false,
                    msg: "User not found"
                });
            }

            await User.findByIdAndDelete(
                req.user.id
            );

            return res.json({
                success: true,
                msg:
                    "Account deleted successfully"
            });

        } catch (err) {

            console.error(
                "Delete account error:",
                err
            );

            return res.status(500).json({
                success: false,
                msg: "Server error"
            });
        }
    }
);


// ============================================================
// EXPORT
// ============================================================

module.exports = router;