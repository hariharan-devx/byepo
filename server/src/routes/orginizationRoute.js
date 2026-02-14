import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validateRequest } from "../middlewares/validateMiddleware.js";
import { organizationSchema } from "../validations/organizationValidation.js";
import { createOrganization, getOrganizations } from "../controllers/organizationController.js";

const router = express.Router();

const superAdminRole = process.env.SUPER_ADMIN_ROLE;

router.post(
  "/organizations",
  authMiddleware,
  roleMiddleware(superAdminRole),
  validateRequest(organizationSchema),
  createOrganization,
);

router.get("/organizations", authMiddleware, roleMiddleware(superAdminRole), getOrganizations);

export default router;
