// src/features/booking/application/dto/BookingDTO.ts
//DTO used in redux and api implementations

import { BookingStatus } from "../../../../shared/types/BookingStatus";
import { PetSize } from "../../../../shared/types/PetSizes";

export interface BookingDTO {
  id: string;
  petId: string;
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