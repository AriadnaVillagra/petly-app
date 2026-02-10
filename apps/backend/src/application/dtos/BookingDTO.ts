// src/application/dtos/BookingDTO.ts
// Data Transfer Object for Booking entity, defines the structure of booking data exchanged between layers

import { ServiceType } from "../../domain/entities/Booking";
import { PetSize } from "../../domain/entities/Pet";

export type BookingStatus =
    | 'PENDING'
    | 'CONFIRMED'
    | 'PAID'
    | 'CANCELLED';

export interface BookingDTO {
    petId: string;
    petName: string;
    petSize: PetSize;
    serviceId: string;
    serviceName: string;
    serviceType: ServiceType;
    price: number;
    date: string;
    time: string;
    status: BookingStatus;
    durationMinutes: number;
}

