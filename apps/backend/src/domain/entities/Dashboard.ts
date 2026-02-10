// src/domain/entities/Dashboard.ts
// Entity representing the dashboard data, including the next booking and statistics about bookings

import { BookingStatus } from "../../application/dtos/BookingDTO";

export class Dashboard {
    readonly nextBooking: DashboardNextBooking | null;
    readonly stats: DashboardStats;

    constructor(params: {
        nextBooking: DashboardNextBooking | null;
        stats: DashboardStats;
    }) {
        this.nextBooking = params.nextBooking;
        this.stats = params.stats;
    }
}

export class DashboardStats {
    constructor(
        public readonly total: number,
        public readonly pending: number,
        public readonly confirmed: number,
        public readonly paid: number
    ) { }
}

export class DashboardNextBooking {
    constructor(
        public readonly id: string,
        public readonly serviceName: string,
        public readonly petName: string,
        public readonly petSize: string,
        public readonly date: string,
        public readonly time: string,
        public readonly price: number,
        public readonly status: BookingStatus
    ) { }
}