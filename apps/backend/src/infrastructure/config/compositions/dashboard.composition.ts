// src/infrastructure/config/compositions/dashboard.composition.ts
// Composition root for Dashboard module, where we set up the repository and use case for the dashboard controller

import { GetDashboardUseCase } from "../../../application/usecases/DashboardUseCases";
import { DashboardController } from "../../../interfaces/controller/DashboardController";
import { createBookingRepository } from "../repositories/booking.repository.factory";

const bookingRepository = createBookingRepository();

const getDashboard = new GetDashboardUseCase(bookingRepository);

export const dashboardController = new DashboardController(getDashboard);