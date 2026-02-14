import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import db from "../config/mysqlConfig.js";
import { getUser } from "../dbOperations/userStatements.js";
import CustomError from "../utils/CustomError.js";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new CustomError(401, "You are not logged in!"));
  }
  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded.role === "SUPER_ADMIN") {
    req.user = decoded;
    return next();
  }

  const [user] = await db.query(getUser, [decoded.id]);
  if (!user || user.length === 0) {
    return next(new CustomError(401, "The user with the given token does not exist"));
  }

  req.user = user[0];
  next();
});
