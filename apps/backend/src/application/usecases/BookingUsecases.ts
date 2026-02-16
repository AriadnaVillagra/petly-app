// src/application/usecases/BookingUsecases.ts
// Use case for creating a booking, implements the business logic for handling booking creation

import { Booking } from "../../domain/entities/Booking";
import { BookingRepository } from "../../domain/repositories/BookingRepository";
import { BookingDTO, BookingStatus } from "../dtos/BookingDTO";
import crypto from "crypto";

export class CreateBookingUseCase {
    constructor(private bookingRepo: BookingRepository) { }

    async execute(dto: BookingDTO, userId: string): Promise<Booking> {
        const booking = new Booking(
            crypto.randomUUID(),
            dto.petId,
            dto.petName,
            dto.petSize,
            userId,
            {
                id: dto.serviceId,
                name: dto.serviceName,
                basePrice: dto.price,
                type: dto.serviceType
            },
            dto.date,
            dto.time,
            dto.durationMinutes,
            dto.status
        );


        return this.bookingRepo.create(booking);
    }
}

export class GetBookingByIdUseCase {
    constructor(private bookingRepo: BookingRepository) { }

    async execute(bookingId: string): Promise<Booking> {
        return this.bookingRepo.getById(bookingId);
    }
}

export class UpdateBookingStatusUseCase {
    constructor(private bookingRepo: BookingRepository) { }

    async execute(bookingId: string, newStatus?: BookingStatus): Promise<Booking> {

        if (!newStatus) {
            throw new Error("Status is required");
        }

        const booking = await this.bookingRepo.getById(bookingId);

        const updatedBooking = new Booking(
            booking.id,
            booking.petId,
            booking.petName,
            booking.petSize,
            booking.userId,
            booking.service,
            booking.date,
            booking.time,
            booking.durationMinutes,
            newStatus
        );
        return this.bookingRepo.update(updatedBooking);

    }
}

export class ListBookingsUseCase {
    constructor(private bookingRepo: BookingRepository) { }

    async execute(): Promise<Booking[]> {
        return this.bookingRepo.getAll();
    }
}

export class DeleteBookingUseCase {
    constructor(private bookingRepo: BookingRepository) { }
    async execute(id: string): Promise<Booking> {
        const booking = await this.bookingRepo.getById(id);

        const cancelled = new Booking(
            booking.id,
            booking.petId,
            booking.petName,
            booking.petSize,
            booking.userId,
            booking.service,
            booking.date,
            booking.time,
            booking.durationMinutes,
            "CANCELLED"
        );

        return this.bookingRepo.update(cancelled);
    }
}
