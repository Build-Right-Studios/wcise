const User = require("../models/user.model");

/**
 * AUTHOR GUARD
 */
export const isAuthor = async (req, res, next) => {
  try {
    // Case 1: req.user missing
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

    // Case 2: not Author
    if (!user.role.includes("Author")) {
      return res.status(403).json({
        success: false,
        message: "This route is accessible to authors only."
      });
    }

    // Case 3: valid Author
    req.currentUser = user;
    next();

  } catch (err) {
    console.error("isAuthor Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
};
