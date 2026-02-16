// src/app.ts
// Main application setup file
//dotenv is used to load environment variables from a .env file into process.env, allowing us to manage configuration settings securely and conveniently.
import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import petRoutes from "./interfaces/routes/pet.routes";
import bookingRoutes from "./interfaces/routes/booking.routes";
import dashboardRoutes from "./interfaces/routes/dashboard.routes";
import paymentRoutes from './interfaces/routes/payment.routes';

export const app = express();

app.use(express.json());
app.use("/api", petRoutes);
app.use("/api", bookingRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", paymentRoutes);