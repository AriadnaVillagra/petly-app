// src/features/dashboard/data/repositories/DashboardApiRepository.ts
// feature-by-feature implementation of the repository for the dashboard provider's API.

import { DashboardMapper } from "../../application/mapper/DashboardMapper";
import { Dashboard } from "../../domain/entities/Dashboard";
import { DashboardRepository } from "../../domain/repositories/DashboardRepository";
import { DashboardApiClient } from "../http/DashboardApiClient";


export class DashboardApiRepository implements DashboardRepository {
  async getDashboard(): Promise<Dashboard> {
    const { data } = await DashboardApiClient.get('/dashboard');

    return DashboardMapper.toDomain(data);
  }
}