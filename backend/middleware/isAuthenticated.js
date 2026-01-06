const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || "your_super_secret_key";

const isAuthenticated = (req, res, next) => {
  try {
    // Case 1: Authorization header missing
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Access token missing",
      });
    }

    // Expecting: Bearer <token>
    const accessToken = authHeader.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Access token missing",
      });
    }

    // Verify token
    const decoded = jwt.verify(accessToken, SECRET_KEY);

    // Case 2: Invalid token payload (extra safety)
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Case 3: Valid token
    req.user = decoded; // { userId }
    next();

  } catch (err) {
    // Token expired / invalid signature
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Access token expired",
      });
    }

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid access token",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = isAuthenticated ;
