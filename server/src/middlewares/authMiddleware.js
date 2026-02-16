import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import db from "../config/mysqlConfig.js";
import { getUserQuery } from "../dbOperations/userStatements.js";
import CustomError from "../utils/CustomError.js";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new CustomError(401, "You are not logged in!"));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded.role === "SUPER_ADMIN") {
    req.user = decoded;
    return next();
  }

  const [user] = await db.query(getUserQuery, [decoded.id]);
  if (!user || user.length === 0) {
    return next(new CustomError(401, "The user with the given token does not exist"));
  }

  req.user = user[0];
  next();
});
