// src/infrastructure/config/dashboard.composition.ts
// Composition root for Dashboard module, where we set up the repository and use case for the dashboard controller

import { GetDashboardUseCase } from "../../application/usecases/DashboardUseCases";
import { DashboardController } from "../../interfaces/controller/DashboardController";
import { bookingRepository } from "../persistence";
import { DashboardMemoryRepository } from "../persistence/DashboardMemoryRepository";

const dashboardRepository = new DashboardMemoryRepository();

const getDashboard = new GetDashboardUseCase(
  dashboardRepository,
  bookingRepository
);

export const dashboardController = new DashboardController(getDashboard);
