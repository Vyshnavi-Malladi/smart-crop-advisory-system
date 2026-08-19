// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   const authHeader = req.header("Authorization");

//   if (!authHeader) {
//     return res.status(401).json({ msg: "No token, authorization denied" });
//   }

//   try {
//     // Extract token properly
//     const token = authHeader.startsWith("Bearer ")
//       ? authHeader.split(" ")[1]
//       : authHeader;

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // ✅ Your login creates token like:
//     // { user: { id, role } }
//     if (!decoded.user || !decoded.user.id) {
//       return res.status(401).json({ msg: "Invalid token structure" });
//     }

//     req.user = {
//       id: decoded.user.id
//     };

//     next();

//   } catch (err) {
//     console.error("Auth error:", err.message);
//     return res.status(401).json({ msg: "Token is not valid" });
//   }
// };





// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   const authHeader = req.header("Authorization");

//   if (!authHeader) {
//     return res.status(401).json({ msg: "No token, authorization denied" });
//   }

//   try {
//     // Extract token
//     const token = authHeader.startsWith("Bearer ")
//       ? authHeader.split(" ")[1]
//       : authHeader;

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // ✅ Make sure structure exists
//     if (!decoded.user || !decoded.user.id) {
//       return res.status(401).json({ msg: "Invalid token structure" });
//     }

//     // 🔥 IMPORTANT FIX: Attach role also
//     req.user = {
//       id: decoded.user.id,
//       role: decoded.user.role   // ✅ THIS WAS MISSING
//     };

//     next();

//   } catch (err) {
//     console.error("Auth error:", err.message);
//     return res.status(401).json({ msg: "Token is not valid" });
//   }
// };















// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {

//   const authHeader = req.header("Authorization");

//   if (!authHeader) {
//     return res.status(401).json({ msg: "No token, authorization denied" });
//   }

//   try {

//     // Extract token
//     const token = authHeader.startsWith("Bearer ")
//       ? authHeader.split(" ")[1]
//       : authHeader;

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Ensure token structure is valid
//     if (!decoded.user || !decoded.user.id) {
//       return res.status(401).json({ msg: "Invalid token structure" });
//     }

//     // Attach user info to request
//     req.user = {
//       id: decoded.user.id,
//       role: decoded.user.role
//     };

//     next();

//   } catch (err) {

//     console.error("Auth error:", err.message);

//     if (err.name === "TokenExpiredError") {
//       return res.status(401).json({ msg: "Token expired" });
//     }

//     return res.status(401).json({ msg: "Token is not valid" });
//   }
// };








// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   const authHeader = req.header("Authorization");

//   if (!authHeader) {
//     return res.status(401).json({ 
//       success: false,
//       msg: "No token, authorization denied" 
//     });
//   }

//   try {
//     // Extract token
//     const token = authHeader.startsWith("Bearer ")
//       ? authHeader.split(" ")[1]
//       : authHeader;

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Ensure token structure is valid
//     if (!decoded.user || !decoded.user.id) {
//       return res.status(401).json({ 
//         success: false,
//         msg: "Invalid token structure" 
//       });
//     }

//     // Attach user info to request
//     req.user = {
//       id: decoded.user.id,
//       role: decoded.user.role || 'user'
//     };

//     next();
//   } catch (err) {
//     console.error("Auth error:", err.message);

//     if (err.name === "TokenExpiredError") {
//       return res.status(401).json({ 
//         success: false,
//         msg: "Token expired" 
//       });
//     }

//     return res.status(401).json({ 
//       success: false,
//       msg: "Token is not valid" 
//     });
//   }
// };

// // Optional: Admin middleware
// module.exports.isAdmin = function (req, res, next) {
//   if (req.user && req.user.role === 'admin') {
//     next();
//   } else {
//     return res.status(403).json({ 
//       success: false,
//       msg: "Access denied. Admin privileges required." 
//     });
//   }
// };














// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// module.exports = async function (req, res, next) {
//   const authHeader = req.header("Authorization");

//   if (!authHeader) {
//     return res.status(401).json({ 
//       success: false,
//       msg: "No token, authorization denied" 
//     });
//   }

//   try {
//     // Extract token
//     const token = authHeader.startsWith("Bearer ")
//       ? authHeader.split(" ")[1]
//       : authHeader;

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Ensure token structure is valid
//     if (!decoded.user || !decoded.user.id) {
//       return res.status(401).json({ 
//         success: false,
//         msg: "Invalid token structure" 
//       });
//     }

//     // ✅ Get full user from database
//     const user = await User.findById(decoded.user.id).select('-password');
    
//     if (!user) {
//       return res.status(401).json({ 
//         success: false,
//         msg: "User not found" 
//       });
//     }

//     // Attach user info to request
//     req.user = {
//       id: user._id,
//       role: user.role || 'user',
//       hasCompletedProfile: user.hasCompletedProfile || false,
//       email: user.email,
//       name: user.name
//     };

//     next();
//   } catch (err) {
//     console.error("Auth error:", err.message);

//     if (err.name === "TokenExpiredError") {
//       return res.status(401).json({ 
//         success: false,
//         msg: "Token expired" 
//       });
//     }

//     return res.status(401).json({ 
//       success: false,
//       msg: "Token is not valid" 
//     });
//   }
// };

// // Optional: Admin middleware
// module.exports.isAdmin = function (req, res, next) {
//   if (req.user && req.user.role === 'admin') {
//     next();
//   } else {
//     return res.status(403).json({ 
//       success: false,
//       msg: "Access denied. Admin privileges required." 
//     });
//   }
// };












// middleware/auth.js

const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function (req, res, next) {
  const authHeader = req.header("Authorization");

  // =====================================================
  // CHECK AUTHORIZATION HEADER
  // =====================================================

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      msg: "No token, authorization denied"
    });
  }

  try {
    // ===================================================
    // EXTRACT TOKEN
    // ===================================================

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    if (!token) {
      return res.status(401).json({
        success: false,
        msg: "No token, authorization denied"
      });
    }

    // ===================================================
    // VERIFY TOKEN
    // ===================================================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // ===================================================
    // CHECK TOKEN STRUCTURE
    // ===================================================

    if (!decoded.user || !decoded.user.id) {
      return res.status(401).json({
        success: false,
        msg: "Invalid token structure"
      });
    }

    // ===================================================
    // GET REAL USER FROM DATABASE
    // ===================================================

    const user = await User.findById(
      decoded.user.id
    ).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        msg: "User not found"
      });
    }

    // ===================================================
    // ATTACH REAL DATABASE USER TO REQUEST
    // ===================================================

    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
      landArea: user.landArea,
      role: user.role || "user",

      hasCompletedProfile:
        user.hasCompletedProfile || false,

      notificationsEnabled:
        user.notificationsEnabled !== false
    };

    next();

  } catch (err) {
    console.error(
      "Auth error:",
      err.message
    );

    // ===================================================
    // TOKEN EXPIRED
    // ===================================================

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        msg: "Token expired"
      });
    }

    // ===================================================
    // INVALID TOKEN
    // ===================================================

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        msg: "Token is not valid"
      });
    }

    // ===================================================
    // OTHER AUTH ERROR
    // ===================================================

    return res.status(401).json({
      success: false,
      msg: "Authentication failed"
    });
  }
};


// =======================================================
// ADMIN MIDDLEWARE
// =======================================================

module.exports.isAdmin = function (req, res, next) {

  if (
    req.user &&
    req.user.role === "admin"
  ) {
    return next();
  }

  return res.status(403).json({
    success: false,
    msg: "Access denied. Admin privileges required."
  });
};