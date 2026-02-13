import { Booking } from '../../domain/entities/Booking';
import { BookingRepository } from '../../domain/repositories/BookingRepository';
import { BookingMapper } from '../../application/mapper/BookingMapper';
import { BookingDTO } from '../../application/dto/BookingDTO';
import { BookingApiClient } from '../http/BookingApiClient';

export class BookingApiRepository implements BookingRepository {

    async create(booking: Booking): Promise<Booking> {
        const dto = BookingMapper.toDTO(booking);

        const { data } = await BookingApiClient.post<BookingDTO>(
            '/bookings',
            dto
        );

        return BookingMapper.toDomain(data);
    }

    async getAll(): Promise<Booking[]> {
        const { data } = await BookingApiClient.get<BookingDTO[]>('/bookings');
        return data.map(BookingMapper.toDomain);
    }

    async getById(id: string): Promise<Booking> {
        const { data } = await BookingApiClient.get<BookingDTO>(`/bookings/${id}`);
        return BookingMapper.toDomain(data);
    }

    async update(booking: Booking): Promise<Booking> {
        const status = booking.status;

        const { data } = await BookingApiClient.patch<BookingDTO>(
            `/bookings/${booking.id}/status`,
            { status }
        );

        return BookingMapper.toDomain(data);
    }


    async delete(id: string): Promise<void> {
        await BookingApiClient.delete(`/bookings/${id}`);
    }
}
