// src/application/usecases/DashboardUseCases.ts
// Use case for fetching dashboard data, including the next booking and statistics about bookings

import { Dashboard, DashboardNextBooking, DashboardStats } from "../../domain/entities/Dashboard";
import { BookingRepository } from "../../domain/repositories/BookingRepository";

export class GetDashboardUseCase {
  constructor(
    private bookingRepo: BookingRepository
  ) { }

  async execute(userId: string): Promise<Dashboard> {
    const now = new Date();
    const bookings = await this.bookingRepo.findByUser(userId);

    const upcomingBookings = bookings
      .map(b => ({
        ...b,
        dateTime: new Date(`${b.date}T${b.time}`)
      }))
      .filter(b =>
        (b.status === "PENDING_PAYMENT" || b.status === "PAID") &&
        b.dateTime >= now
      )
      .sort((a, b) =>
        a.dateTime.getTime() - b.dateTime.getTime()
      );

    const nextBooking = upcomingBookings[0] ?? null;

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
        bookings.filter(b => b.status === "PENDING_PAYMENT").length,
        bookings.filter(b => b.status === "EXPIRED").length,
        bookings.filter(b => b.status === "PAID").length
      )
    });
  }
}