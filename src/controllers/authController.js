import bcrypt from "bcrypt";
import asyncHandler from "../utils/asyncHandler.js";
import db from "../config/mysqlConfig.js";
import { generateToken } from "../utils/jwt.js";
import { signupUser, loginUser, getUser } from "../dbOperations/usersStatements.js";
import CustomError from "../utils/CustomError.js";

export const signup = asyncHandler(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const [newUser] = await db.query(signupUser, [username, email, hashedPassword, role, "Y"]);
  if (!newUser || newUser.affectedRows === 0) {
    return next(new CustomError(404, "User failed to add"));
  }
  const [user] = await db.query(getUser, [newUser.insertId]);

  generateToken(user[0], 201, res);
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const [user] = await db.query(loginUser, [email]);

  if (!user || user.length === 0) {
    return next(new CustomError(404, "Incorrect email"));
  }
  const userPassword = user[0].password;

  const isPasswordMatch = await bcrypt.compare(password, userPassword);

  if (!isPasswordMatch) {
    return next(new CustomError(404, "Incorrect password"));
  }

  generateToken(user[0], 200, res);
});

// export const logout = asyncHandler(async (req, res, next) => {
//   res.clearCookie("jwt");

//   res.status(200).json({
//     status: "success",
//     message: `Logout successfully for ${req.user.email}`,
//   });
// });
