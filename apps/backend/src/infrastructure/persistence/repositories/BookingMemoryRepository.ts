// src/infrastructure/persistence/BookingMemoryRepository.ts
// In-memory implementation of BookingRepository for testing and development purposes, simulates database operations using an array

import { Booking } from "../../../domain/entities/Booking";
import { BookingRepository } from "../../../domain/repositories/BookingRepository";



export class BookingMemoryRepository implements BookingRepository {
  async findByUser(userId: string): Promise<Booking[]> {
    return this.bookings.filter(b => b.userId === userId);
  }
  
  private bookings: Booking[] = [];

  async create(booking: Booking): Promise<Booking> {
    this.bookings.push(booking);
    return Promise.resolve(booking);
  }

  async getById(id: string): Promise<Booking> {
    const booking = this.bookings.find(b => b.id === id);
    if (!booking) throw new Error("Booking not found");
    return Promise.resolve(booking);
  }

  async update(booking: Booking): Promise<Booking> {
    const index = this.bookings.findIndex(b => b.id === booking.id);
    if (index === -1) throw new Error("Booking not found");
    this.bookings[index] = booking;
    return Promise.resolve(booking);
  }

  async getAll(): Promise<Booking[]> {
    return Promise.resolve(this.bookings);
  }
}
