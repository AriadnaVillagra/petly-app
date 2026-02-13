// src/features/booking/domain/repositories/BookingRepository.ts

import { Booking } from '../entities/Booking';

export interface BookingRepository {
  create(booking: Booking): Promise<Booking>;
  getById(id: string): Promise<Booking>;
  update(booking: Booking): Promise<Booking>;
  getAll(): Promise<Booking[]>;
  delete(id: string): Promise<void>;
}
