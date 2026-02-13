// features/booking/application/mapper/BookingMapper.ts
import { Booking } from '../../domain/entities/Booking';
import { BookingDTO } from '../dto/BookingDTO';

export class BookingMapper {
  static toDTO(booking: Booking): BookingDTO {
    return {
      id: booking.id,
      petId: booking.petId,
      petName: booking.petName,
      petSize: booking.petSize,
      serviceId: booking.service.id,
      serviceName: booking.service.name,
      price: booking.price,
      date: booking.date,
      time: booking.time,
      durationMinutes: booking.durationMinutes,
      status: booking.status,
    };
  }


  static toDomain(dto: any): Booking {
    return new Booking(
      dto.id,
      dto.petId,
      dto.petName,
      dto.petSize,
      dto.userId ?? '',
      {
        id: dto.service?.id ?? dto.serviceId,
        name: dto.service?.name ?? dto.serviceName
      },
      dto.service?.basePrice ?? dto.price,
      dto.date,
      dto.time,
      dto.durationMinutes,
      dto.status
    );
  }


}
