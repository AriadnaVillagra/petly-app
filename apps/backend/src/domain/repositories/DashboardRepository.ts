// src/domain/repositories/DashboardRepository.ts
// Repository interface for fetching dashboard data, including the next booking and statistics about bookings

import { Dashboard } from "../entities/Dashboard";


export interface DashboardRepository {
  getDashboard(): Promise<Dashboard>;
}
