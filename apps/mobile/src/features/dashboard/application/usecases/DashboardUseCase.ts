// application/usecases/DashboardUseCase.ts

import { DashboardRepository } from '../../domain/repositories/DashboardRepository';
import { Dashboard } from '../../domain/entities/Dashboard';

export class DashboardUseCase {
  constructor(
    private readonly dashboardRepository: DashboardRepository
  ) {}

  async execute(): Promise<Dashboard> {
    return this.dashboardRepository.getDashboard();
  }
}
