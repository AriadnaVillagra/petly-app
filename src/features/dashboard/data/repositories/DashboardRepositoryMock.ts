// data/repositories/DashboardRepositoryMock.ts

import { DashboardRepository } from '../../domain/repositories/DashboardRepository';
import { Dashboard, DashboardNextBooking, DashboardStats } from '../../domain/entities/Dashboard';
import { BookingRepository } from '../../../booking/domain/repositories/BookingRepository';

export class DashboardRepositoryMock implements DashboardRepository {
  constructor(
    private readonly bookingRepository: BookingRepository
  ) { }

  async getDashboard(): Promise<Dashboard> {
    const bookings = await this.bookingRepository.getAll();
  const active = bookings.filter(
    b => b.status === 'PENDING' || b.status === 'CONFIRMED'
  );

  const nextBooking = active[0]
    ? new DashboardNextBooking(
      active[0].id,
      active[0].service.name,
      active[0].date,
      active[0].time,
      active[0].price,
      active[0].status
    )
    : null;

    return new Dashboard({
      nextBooking,
      stats: new DashboardStats(
        bookings.length,
        bookings.filter(b => b.status === 'PENDING').length,
        bookings.filter(b => b.status === 'CONFIRMED').length,
        bookings.filter(b => b.status === 'PAID').length
      ),
    });
  };
}