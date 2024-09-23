const jwt=require('jsonwebtoken');
const Admin =require('../models/adminSchema');

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid user" });
    }

    const user = await Admin.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectedRoute middleware:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports =protectRoute;