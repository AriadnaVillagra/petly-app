// src/features/booking/domain/entities/Booking.ts

import { BookingStatus } from '../../../../shared/types/BookingStatus';
import { PetSize } from '../../../../shared/types/PetSizes';

export class Booking {
  constructor(
    public readonly id: string,
    public readonly petId: string,
    public readonly petName: string,
    public readonly petSize: PetSize,
    public readonly userId: string,
    public readonly service: {
      id: string;
      name: string;
    },
    public readonly price: number,
    public readonly date: string,
    public readonly time: string,
    public readonly durationMinutes: number,
    public readonly status: BookingStatus
  ) { }

  confirm(): Booking {
    if (this.status !== 'PENDING') return this;
    return new Booking(
      this.id,
      this.petId,
      this.petName,
      this.petSize,
      this.userId,
      this.service,
      this.price,
      this.date,
      this.time,
      this.durationMinutes,
      'CONFIRMED'
    );
  }

  cancel(): Booking {
    if (this.status === 'CANCELLED') return this;
    return new Booking(
      this.id,
      this.petId,
      this.petName,
      this.petSize,
      this.userId,
      this.service,
      this.price,
      this.date,
      this.time,
      this.durationMinutes,
      'CANCELLED'
    );
  }
}

