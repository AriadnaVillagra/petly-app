// src/interfaces/routes/dashboard.routes.ts
// Express router for dashboard-related endpoints, which fetches dashboard data including the next booking and statistics about bookings

import { Router } from "express";
import { authMiddleware } from "../middleware/AuthMiddleware";
import { dashboardController } from "../../infrastructure/config/compositions/dashboard.composition";


const router = Router();

// GET dashboard data
router.get("/dashboard", authMiddleware, (req, res) => dashboardController.getDashboard(req, res));

export default router;