// src/application/usecases/DashboardUseCases.ts
// Use case for fetching dashboard data, including the next booking and statistics about bookings

import { Dashboard, DashboardNextBooking, DashboardStats } from "../../domain/entities/Dashboard";
import { BookingRepository } from "../../domain/repositories/BookingRepository";

export class GetDashboardUseCase {
  constructor(
    private bookingRepo: BookingRepository
  ) {}

  async execute(userId: string): Promise<Dashboard> {

    const bookings = await this.bookingRepo.findByUser(userId)

    const nextBooking = bookings
      .filter(b => b.status === "PENDING" || b.status === "CONFIRMED")
      .sort((a, b) =>
        new Date(`${a.date} ${a.time}`).getTime() -
        new Date(`${b.date} ${b.time}`).getTime()
      )[0] ?? null;

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
