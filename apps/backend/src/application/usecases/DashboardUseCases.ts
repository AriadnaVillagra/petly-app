// src/application/usecases/DashboardUseCases.ts
// Use case for fetching dashboard data, including the next booking and statistics about bookings

import { Booking } from "../../domain/entities/Booking";
import { Dashboard } from "../../domain/entities/Dashboard";
import { BookingRepository } from "../../domain/repositories/BookingRepository";
import { DashboardRepository } from "../../domain/repositories/DashboardRepository";


export class GetDashboardUseCase {
    constructor(
        private dashboardRepo: DashboardRepository,
        private bookingRepo: BookingRepository
    ) { }

    async execute(userId: string): Promise<Dashboard> {
        const bookings = await this.bookingRepo.getAll();
        return this.dashboardRepo.getDashboard(bookings);
    }
}