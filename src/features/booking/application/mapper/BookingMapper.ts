// features/booking/application/mapper/BookingMapper.ts
import { Booking } from '../../domain/entities/Booking';
import { BookingDTO } from '../dto/BookingDTO';

export class BookingMapper {
  static toDTO(booking: Booking): BookingDTO {
    return {
      id: booking.id,
      petId: booking.petId,
      serviceId: booking.service.id,
      serviceName: booking.service.name,
      price: booking.price,
      date: booking.date,
      time: booking.time,
      durationMinutes: booking.durationMinutes,
      status: booking.status,
    };
  }
}
