// application/dto/DashboardDto.ts

import { BookingStatus } from "../../../../shared/types/BookingStatus";
import { PetSize } from "../../../../shared/types/PetSizes";

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
  petName: string;
  petSize: PetSize;
  date: string;
  time: string;
  price: number;
  status: BookingStatus;
}