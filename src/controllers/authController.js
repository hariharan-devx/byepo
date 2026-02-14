import bcrypt from "bcrypt";
import asyncHandler from "../utils/asyncHandler.js";
import db from "../config/mysqlConfig.js";
import { generateToken } from "../utils/jwt.js";
import { loginUserQuery, signupUserQuery } from "../dbOperations/userStatements.js";
import CustomError from "../utils/CustomError.js";

//Super Admin Login
export const superAdminLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (email !== process.env.SUPER_ADMIN_EMAIL || password !== process.env.SUPER_ADMIN_PASSWORD) {
    return next(new CustomError(404, "Incorrect email or password"));
  }
  const tokenPayload = { id: "superadmin", role: "SUPER_ADMIN" };
  generateToken(tokenPayload, 200, res);
});

//Org Admin and End User Signup
export const signup = asyncHandler(async (req, res, next) => {
  const { email, password, role, organization_id } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const [newUser] = await db.query(signupUserQuery, [email, hashedPassword, role, organization_id, "Y"]);

  if (!newUser || newUser.affectedRows === 0) {
    return next(new CustomError(404, "User failed to add"));
  }

  res.status(201).json({
    status: "success",
    message: "Signup successful",
  });
});

//Login(Org Admin / End User)
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const [user] = await db.query(loginUserQuery, [email]);

  if (!user || user.length === 0) {
    return next(new CustomError(404, "User not found"));
  }

  const isPasswordValid = await bcrypt.compare(password, user[0].password);

  if (!isPasswordValid) {
    return next(new CustomError(401, "Invalid password"));
  }
  const tokenPayload = { id: user[0].id, role: user[0].role, organization_id: user[0].organization_id };

  generateToken(tokenPayload, 200, res);
});
