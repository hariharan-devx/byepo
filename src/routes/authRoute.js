import express from "express";
import { validateToken } from "../utils/jwt.js";
import { validateRequest } from "../middlewares/validateMiddleware.js";
import { loginSchema, signupSchema } from "../validations/authValidation.js";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", validateRequest(signupSchema), signup);
router.post("/login", validateRequest(loginSchema), login);
//router.get("/logout", validateToken, logout);

export default router;
