import { PetSize } from '../../../../shared/types/PetSizes';
import { Booking } from '../../domain/entities/Booking';
import { Service } from '../../domain/entities/Service';
import { BookingRepository } from '../../domain/repositories/BookingRepository';

export interface CreateBookingParams {
  id: string;
  petId: string;
  petName: string;
  petSize: PetSize;
  userId: string;
  service: Service;
  date: string;
  time: string;
  durationMinutes: number;
  price: number;
}

export class CreateBooking {
  constructor(private readonly repository: BookingRepository) {}

  async execute(params: CreateBookingParams): Promise<Booking> {
    const booking = new Booking(
      params.id,
      params.petId,
      params.petName,
      params.petSize,
      params.userId,
      params.service,
      params.date,
      params.time,
      params.durationMinutes,
      'PENDING'
    );

    return this.repository.create(booking);
  }
}

export class ConfirmBooking {
  constructor(private readonly repository: BookingRepository) {}

  async execute(id: string): Promise<Booking> {
    const booking = await this.repository.getById(id);
    const confirmed = booking.confirm();
    return this.repository.update(confirmed);
  }
}

export class CancelBooking {
  constructor(private readonly repository: BookingRepository) {}

  async execute(id: string): Promise<Booking> {
    const booking = await this.repository.getById(id);
    const cancelled = booking.cancel();
    return this.repository.update(cancelled);
  }
}