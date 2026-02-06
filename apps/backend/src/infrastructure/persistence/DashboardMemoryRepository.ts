// src/infrastructure/persistence/DashboardMemoryRepository.ts
// In-memory implementation of the DashboardRepository, which calculates the next booking and statistics based on a list of bookings

import { Booking } from "../../domain/entities/Booking";
import { Dashboard, DashboardNextBooking, DashboardStats } from "../../domain/entities/Dashboard";
import { DashboardRepository } from "../../domain/repositories/DashboardRepository";


export class DashboardMemoryRepository implements DashboardRepository {
    async getDashboard(bookings: Booking[]): Promise<Dashboard> {
        const nextBooking = bookings
            .filter(
                booking =>
                    booking.status === "PENDING" ||
                    booking.status === "CONFIRMED"
            )
            .sort(
                (a, b) =>
                    new Date(`${a.date} ${a.time}`).getTime() -
                    new Date(`${b.date} ${b.time}`).getTime()
            )[0] ?? null;

        const stats = {
            total: bookings.length,
            pending: bookings.filter(booking => booking.status === "PENDING").length,
            confirmed: bookings.filter(booking => booking.status === "CONFIRMED").length,
            paid: bookings.filter(booking => booking.status === "PAID").length,
        };

        return new Dashboard({
            nextBooking: nextBooking
                ? new DashboardNextBooking(
                    nextBooking.id,
                    nextBooking.service.name,
                    nextBooking.petName,
                    nextBooking.petSize,
                    nextBooking.date,
                    nextBooking.time,
                    nextBooking.service.basePrice,
                    nextBooking.status
                )
                : null,

            stats: new DashboardStats(
                bookings.length,
                bookings.filter(b => b.status === "PENDING").length,
                bookings.filter(b => b.status === "CONFIRMED").length,
                bookings.filter(b => b.status === "PAID").length
            )
        });

    }
}