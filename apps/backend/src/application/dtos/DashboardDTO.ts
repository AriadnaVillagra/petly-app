// src/application/dtos/DashboardDTO.ts
// Data Transfer Object for Dashboard data, defines the structure of the dashboard information including next booking and statistics

import { PetSize } from "../../domain/entities/Pet";
import { BookingStatus } from "./BookingDTO";

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