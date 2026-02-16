// src/features/booking/application/dto/BookingDTO.ts
//DTO used in redux and api implementations

import { BookingStatus } from "../../../../shared/types/BookingStatus";
import { PetSize } from "../../../../shared/types/PetSizes";
import { ServiceType } from "../../domain/entities/Service";

export interface BookingDTO {
  id: string;
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