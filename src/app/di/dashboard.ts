// src/app/di/dashboard.ts

import { DashboardUseCase } from '../../features/dashboard/application/usecases/DashboardUseCase';
import { DashboardRepositoryMock } from '../../features/dashboard/data/repositories/DashboardRepositoryMock';
// en el futuro:
// import { DashboardRepositoryApi } from '../../features/dashboard/data/repositories/DashboardRepositoryApi';
import { ENV } from '../config/env';
import { bookingRepository } from './booking';

const dashboardRepository =
  ENV.DASHBOARD_PROVIDER === 'mock'
    // ? new DashboardRepositoryApi()
    ? new DashboardRepositoryMock(bookingRepository) // temporal
    : new DashboardRepositoryMock(bookingRepository); // temporal

export const dashboardUseCase = new DashboardUseCase(dashboardRepository);
