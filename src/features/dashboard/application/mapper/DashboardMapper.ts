// application/mapper/DashboardMapper.ts

import { Dashboard } from '../../domain/entities/Dashboard';
import { DashboardDto } from '../dto/DashboardDto';

export class DashboardMapper {
  static toDto(dashboard: Dashboard): DashboardDto {
    return {
      nextBooking: dashboard.nextBooking
        ? {
            id: dashboard.nextBooking.id,
            serviceName: dashboard.nextBooking.serviceName,
            date: dashboard.nextBooking.date,
            time: dashboard.nextBooking.time,
            price: dashboard.nextBooking.price,
            status: dashboard.nextBooking.status,
          }
        : null,

      stats: {
        total: dashboard.stats.total,
        pending: dashboard.stats.pending,
        confirmed: dashboard.stats.confirmed,
        paid: dashboard.stats.paid,
      },
    };
  }
}
