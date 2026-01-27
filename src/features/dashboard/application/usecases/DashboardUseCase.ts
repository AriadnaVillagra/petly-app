// application/usecases/DashboardUseCase.ts

import { BookingDTO } from '../../../booking/application/dto/BookingDto';
import { DashboardRepository } from '../../domain/repositories/DashboardRepository';
import { Dashboard } from '../../domain/entities/Dashboard';

export class DashboardUseCase {
  constructor(
    private readonly dashboardRepository: DashboardRepository
  ) {}

  async execute(bookings: BookingDTO[]): Promise<Dashboard> {
    return this.dashboardRepository.getDashboard(bookings);
  }
}
