import express from "express";
import { getMatches } from "../controllers/matchController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getMatches);

export default router;
