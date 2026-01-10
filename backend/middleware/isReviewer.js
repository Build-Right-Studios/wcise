const User = require("../models/user.model");
/**
 * REVIEWER GUARD
 */

const isReviewer = async (req, res, next) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        success: false,
        message: "User doesn't exist."
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User doesn't exist."
      });
    }

    if (!user.role.includes("Reviewer")) {
      return res.status(403).json({
        success: false,
        message: "You don't have enough permissions."
      });
    }

    req.currentUser = user;
    next();

  } catch (err) {
    console.error("isReviewer Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
};

module.exports = isReviewer;