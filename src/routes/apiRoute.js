import express from "express";
import { validateToken } from "../utils/jwt.js";
import { validateMultipleRole } from "../utils/roleAccess.js";
import { checkApi, deleteApi } from "../controllers/apiController.js";

const router = express.Router();

router.get("/api", validateToken, checkApi);

router.post("/api/:id", validateToken, validateMultipleRole("Admin", "Staff"), deleteApi);

export default router;
