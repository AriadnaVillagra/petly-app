// src/app/di/dashboard.ts

import { DashboardUseCase } from '../../features/dashboard/application/usecases/DashboardUseCase';
import { DashboardApiRepository } from '../../features/dashboard/data/repositories/DashboardApiRepository';
import { DashboardRepositoryMock } from '../../features/dashboard/data/repositories/DashboardRepositoryMock';
import { ENV } from '../config/env';
import { bookingRepository } from './booking';


const dashboardRepository =
  ENV.DASHBOARD_PROVIDER === 'mock'
    ? new DashboardRepositoryMock(bookingRepository) 
    : new DashboardApiRepository();

export const dashboardUseCase = new DashboardUseCase(dashboardRepository);
