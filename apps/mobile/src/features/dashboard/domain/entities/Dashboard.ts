// domain/entities/Dashboard.ts

import { BookingStatus } from "../../../../shared/types/BookingStatus";
import { PetSize } from "../../../../shared/types/PetSizes";


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

  isEmpty(): boolean {
    return this.stats.total === 0;
  }

  hasActiveBookings(): boolean {
    return this.stats.pending > 0 || this.stats.confirmed > 0;
  }
}

export class DashboardStats {
  constructor(
    public readonly total: number,
    public readonly pending: number,
    public readonly confirmed: number,
    public readonly paid: number
  ) {}
}

export class DashboardNextBooking {
  constructor(
    public readonly id: string,
    public readonly serviceName: string,
    public readonly petName: string,
    public readonly petSize: PetSize,
    public readonly date: string,
    public readonly time: string,
    public readonly price: number,
    public readonly status: BookingStatus
  ) {}
}