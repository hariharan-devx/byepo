import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import db from "../config/mysqlConfig.js";
import { getUser } from "../dbOperations/usersStatements.js";
import CustomError from "./CustomError.js";

export const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const generateToken = (user, statusCode, res) => {
  const token = signToken(user.uid);

  const options = {
    maxAge: process.env.JWT_EXPIRES,
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "prod") options.secure = true;

  res.cookie("jwt", token, options);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};

export const validateToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new CustomError(401, "You are not logged in!"));
  }
  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const [user] = await db.query(getUser, [decoded.id]);
  if (!user || user.length === 0) {
    return next(new CustomError(401, "The user with the given token does not exist"));
  }

  req.user = user[0];
  next();
});
