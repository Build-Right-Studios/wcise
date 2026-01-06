const User = require("../models/user.model");
/**
 * EDITOR GUARD
 */
const isEditor = async (req, res, next) => {
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

    if (!user.roles.includes("Editor")) {
      return res.status(403).json({
        success: false,
        message: "You don't have enough permissions."
      });
    }

    req.currentUser = user;
    next();

  } catch (err) {
    console.error("isEditor Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
};

module.exports = isEditor;