// data/repositories/DashboardRepositoryMock.ts

import { DashboardRepository } from '../../domain/repositories/DashboardRepository';
import { Dashboard, DashboardNextBooking, DashboardStats } from '../../domain/entities/Dashboard';
import { BookingRepository } from '../../../booking/domain/repositories/BookingRepository';

export class DashboardRepositoryMock implements DashboardRepository {
  constructor(
    private readonly bookingRepository: BookingRepository
  ) {}

  async getDashboard(): Promise<Dashboard> {
    const bookings = await this.bookingRepository.getAll();
    const now = new Date();

    const upcomingBookings = bookings
      .map(b => ({
        ...b,
        dateTime: new Date(`${b.date}T${b.time}`)
      }))
      .filter(b =>
        (b.status === 'PENDING_PAYMENT' || b.status === 'PAID') &&
        b.dateTime >= now
      )
      .sort((a, b) =>
        a.dateTime.getTime() - b.dateTime.getTime()
      );

    const next = upcomingBookings[0] ?? null;

    const nextBooking = next
      ? new DashboardNextBooking(
          next.id,
          next.service.name,
          next.petName,
          next.petSize,
          next.date,
          next.time,
          next.service.basePrice,
          next.status
        )
      : null;

    return new Dashboard({
      nextBooking,
      stats: new DashboardStats(
        bookings.length,
        bookings.filter(b => b.status === 'PENDING_PAYMENT').length,
        bookings.filter(b => b.status === 'EXPIRED').length,
        bookings.filter(b => b.status === 'PAID').length
      ),
    });
  }
}
