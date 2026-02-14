import express from "express";
import { validateRequest } from "../middlewares/validateMiddleware.js";
import { loginSchema, signupSchema } from "../validations/authValidation.js";
import { superAdminLogin, signup, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/auth/super-admin/login", validateRequest(loginSchema), superAdminLogin);
router.post("/auth/signup", validateRequest(signupSchema), signup);
router.post("/auth/login", validateRequest(loginSchema), login);

export default router;
