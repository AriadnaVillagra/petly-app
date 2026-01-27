import { BookingStatus } from "../../../../shared/types/BookingStatus";

export interface BookingDTO {
  id: string;
  petId: string;
  serviceId: string;
  serviceName: string;
  price: number;
  date: string;
  time: string;
  status: BookingStatus;
  durationMinutes: number;
}