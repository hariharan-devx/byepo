import express from "express";
import { validateRequest } from "../middlewares/validateMiddleware.js";
import { loginSchema, signupSchema } from "../validations/authValidation.js";
import { superAdminLogin, signup, login, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/auth/super-admin/login", validateRequest(loginSchema), superAdminLogin);
router.post("/auth/org-admin-signup", validateRequest(signupSchema), signup(process.env.ORG_ADMIN_ROLE));
router.post("/auth/end-user-signup", validateRequest(signupSchema), signup(process.env.END_USER_ROLE));
router.post("/auth/login", validateRequest(loginSchema), login);
router.post("/auth/logout", logout);

export default router;
