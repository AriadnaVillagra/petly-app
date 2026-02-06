// src/domain/repositories/BookingRepository.ts
// Interface for BookingRepository, defines methods for creating, retrieving, updating, and listing bookings

import { Booking } from "../entities/Booking";

export interface BookingRepository {
  create(booking: Booking): Promise<Booking>;
  getById(id: string): Promise<Booking>;
  update(booking: Booking): Promise<Booking>;
  getAll(): Promise<Booking[]>;
}
