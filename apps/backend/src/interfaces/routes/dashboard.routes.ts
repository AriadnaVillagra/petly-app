// src/interfaces/routes/dashboard.routes.ts
// Express router for dashboard-related endpoints, which fetches dashboard data including the next booking and statistics about bookings

import { Router } from "express";
import { dashboardController } from "../../infrastructure/config/dashboard.composition";


const router = Router();

// GET dashboard data
router.get("/dashboard", (req, res) => dashboardController.getDashboard(req, res));

export default router;