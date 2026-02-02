// src/app.ts

import express from "express";
import petRoutes from "./interfaces/routes/pet.routes";

export const app = express();

app.use(express.json());
app.use("/api", petRoutes);