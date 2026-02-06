// src/app.ts
// Main application setup file

import express from "express";
import petRoutes from "./interfaces/routes/pet.routes";
import bookingRoutes from "./interfaces/routes/booking.routes";
import dashboardRoutes from "./interfaces/routes/dashboard.routes";

export const app = express();

app.use(express.json());
app.use("/api", petRoutes);
app.use("/api", bookingRoutes);
app.use("/api", dashboardRoutes);