// src/domain/entities/Booking.ts
// Booking entity represents a pet grooming appointment, including details about the pet, service, date, time, and status

import { BookingStatus } from "../../application/dtos/BookingDTO";
import { PetSize } from "./Pet";

export class Booking {
    constructor(
        public readonly id: string,
        public readonly petId: string,
        public readonly petName: string,
        public readonly petSize: PetSize,
        public readonly userId: string,
        public readonly service: Service,
        public readonly date: string,
        public readonly time: string,
        public readonly durationMinutes: number,
        public readonly status: BookingStatus
    ) { }
}

export type ServiceType =
    | 'BATH'
    | 'HYGIENIC_CUT'
    | 'NAIL_TRIM'
    | 'BATH_AND_CUT'
    | 'STRIPPING';

export class Service {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly basePrice: number,
        public readonly type: ServiceType
    ) { }
}
