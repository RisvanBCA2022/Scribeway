import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";
import User from "../models/userModel.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return next(errorHandler(401, "Unauthorized"));
    }

    // Verify the token and get the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user from the database excluding the password
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // Set req.user with the user object
    req.user = user;

    // Proceed to the next middleware
    next();
  } catch (err) {
    return next(errorHandler(401, "Unauthorized"));
  }
};

export const checkRole = (requiredRole) => {
  return (req, res, next) => {
    const { role, isAdmin } = req.user;

    if (isAdmin) {
      return next();
    }

    if (role === requiredRole) {
      return next();
    }

    return res.status(403).json({ message: "Access denied" });
  };
};

export const checkSuperAdmin = (req, res, next) => {
  const { isAdmin } = req.user;

  if (isAdmin) {
    return next();
  } else {
    return res
      .status(403)
      .json({
        message: "Access denied. Only Super Admins can perform this action.",
      });
  }
};
