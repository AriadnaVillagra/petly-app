// application/dto/DashboardDto.ts

import { BookingStatus } from "../../../../shared/types/BookingStatus";

export interface DashboardDto {
  nextBooking: DashboardNextBookingDto | null;

  stats: {
    total: number;
    pending: number;
    confirmed: number;
    paid: number;
  };
}

export interface DashboardNextBookingDto {
  id: string;
  serviceName: string;
  date: string;
  time: string;
  price: number;
  status: BookingStatus;
}