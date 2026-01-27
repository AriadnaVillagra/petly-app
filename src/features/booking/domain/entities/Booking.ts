import { BookingStatus } from '../../../../shared/types/BookingStatus';
import { Service } from './Service';



export class Booking {
  constructor(
    public readonly id: string,
    public readonly petId: string,
    public readonly userId: string,
    public readonly service: Service,
    public readonly date: string,
    public readonly time: string,
    public readonly durationMinutes: number,
    public readonly status: BookingStatus
  ) {}

  get price(): number {
    return this.service.basePrice;
  }

  confirm(): Booking {
    if (this.status !== 'PENDING') return this;
    return new Booking(
      this.id,
      this.petId,
      this.userId,
      this.service,
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
      this.userId,
      this.service,
      this.date,
      this.time,
      this.durationMinutes,
      'CANCELLED'
    );
  }
}

