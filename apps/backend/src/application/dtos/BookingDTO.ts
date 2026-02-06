// src/application/dtos/BookingDTO.ts
// Data Transfer Object for Booking entity, defines the structure of booking data exchanged between layers

import { PetSize } from "../../domain/entities/Pet";

export type BookingStatus =
    | 'PENDING'
    | 'CONFIRMED'
    | 'PAID'
    | 'CANCELLED';

export interface BookingDTO {
    petName: string;
    petSize: PetSize;
    serviceId: string;
    serviceName: string;
    price: number;
    date: string;
    time: string;
    status: BookingStatus;
    durationMinutes: number;
}

