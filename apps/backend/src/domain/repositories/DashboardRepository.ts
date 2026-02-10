// src/domain/repositories/DashboardRepository.ts
// Repository interface for fetching dashboard data, including the next booking and statistics about bookings

import { Booking } from "../entities/Booking";
import { Dashboard } from "../entities/Dashboard";


export interface DashboardRepository {
  getDashboard(bookings: Booking[]): Promise<Dashboard>;
}
