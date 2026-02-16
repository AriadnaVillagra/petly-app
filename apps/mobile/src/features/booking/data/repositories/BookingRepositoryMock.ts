// src/features/booking/data/repositories/BookingRepositoryMock.ts
// we dont use the mapper because this is a mock repository dont saves anything to the backend, just in memory, so we can use the domain model directly

import { Booking } from '../../domain/entities/Booking';
import { BookingRepository } from '../../domain/repositories/BookingRepository';

export class BookingRepositoryMock implements BookingRepository {
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  private bookings: Booking[] = [];

  async create(booking: Booking): Promise<Booking> {
    this.bookings.push(booking);
    return booking;
  }

  async getAll(): Promise<Booking[]> {
    return this.bookings;
  }

  async getById(id: string): Promise<Booking> {
    const booking = this.bookings.find(b => b.id === id);
    if (!booking) throw new Error('Booking not found');
    return booking;
  }

  async update(updated: Booking): Promise<Booking> {
    this.bookings = this.bookings.map(b =>
      b.id === updated.id ? updated : b
    );
    return updated;
  }

  async findByUser(userId: string): Promise<Booking[]> {
    return this.bookings.filter(b => b.userId === userId);
  }
}
