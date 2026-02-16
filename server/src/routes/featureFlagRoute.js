import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validateRequest } from "../middlewares/validateMiddleware.js";
import {
  createFeatureFlagSchema,
  updateFeatureFlagSchema,
  deleteFeatureFlagSchema,
  checkFeatureFlagSchema,
} from "../validations/featureFlagValidation.js";
import {
  checkFeatureFlag,
  createFeatureFlag,
  updateFeatureFlag,
  deleteFeatureFlag,
  listFeatureFlag,
} from "../controllers/featureFlagController.js";

const router = express.Router();

const orgAdminRole = process.env.ORG_ADMIN_ROLE;
const endUserRole = process.env.END_USER_ROLE;

router.post(
  "/feature-flags/create",
  authMiddleware,
  roleMiddleware(orgAdminRole),
  validateRequest(createFeatureFlagSchema),
  createFeatureFlag,
);

router.put(
  "/feature-flags/update",
  authMiddleware,
  roleMiddleware(orgAdminRole),
  validateRequest(updateFeatureFlagSchema),
  updateFeatureFlag,
);

router.put(
  "/feature-flags/delete/:id",
  authMiddleware,
  roleMiddleware(orgAdminRole),
  validateRequest(deleteFeatureFlagSchema, "params"),
  deleteFeatureFlag,
);

router.get("/feature-flags/list", authMiddleware, roleMiddleware(orgAdminRole), listFeatureFlag);

router.post(
  "/feature-flags/check",
  authMiddleware,
  roleMiddleware(endUserRole),
  validateRequest(checkFeatureFlagSchema),
  checkFeatureFlag,
);

export default router;
