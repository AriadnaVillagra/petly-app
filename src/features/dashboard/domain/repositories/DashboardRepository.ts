// domain/repositories/DashboardRepository.ts
import { BookingDTO } from '../../../booking/application/dto/BookingDto';
import { Dashboard } from '../entities/Dashboard';

export interface DashboardRepository {
  getDashboard(bookings: BookingDTO[]): Promise<Dashboard>;
}
