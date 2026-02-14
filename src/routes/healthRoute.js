import express from "express";
import healthz from "../controllers/healthController.js";

const router = express.Router();

router.get("/health", healthz);

export default router;
