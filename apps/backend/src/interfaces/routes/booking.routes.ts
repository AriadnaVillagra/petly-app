// src/interfaces/routes/booking.routes.ts

import { Router } from "express";
import { bookingController } from "../../infrastructure/config/booking.composition";

const router = Router();

// CREATE
router.post("/bookings", (req, res) => bookingController.create(req, res)
);

// GET all bookings for authenticated user
router.get("/bookings", (req, res) => bookingController.getAll(req, res)
);

// GET by id
router.get("/bookings/:bookingId", (req, res) => bookingController.getById(req, res)
);

// UPDATE status
router.patch("/bookings/:bookingId/status", (req, res) => bookingController.updateStatus(req, res)
);

// DELETE (cancel booking)
router.delete("/bookings/:bookingId", (req, res) => bookingController.delete(req, res)
);

export default router;
