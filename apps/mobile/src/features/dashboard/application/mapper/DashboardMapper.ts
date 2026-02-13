// application/mapper/DashboardMapper.ts

import { PetSize } from '../../../../shared/types/PetSizes';
import { Dashboard, DashboardNextBooking, DashboardStats } from '../../domain/entities/Dashboard';
import { DashboardDto } from '../dto/DashboardDto';

export class DashboardMapper {
  static toDomain(data: DashboardDto): Dashboard {
    const nextBooking = data.nextBooking
      ? new DashboardNextBooking(
        data.nextBooking.id,
        data.nextBooking.serviceName,
        data.nextBooking.petName,
        data.nextBooking.petSize as PetSize,
        data.nextBooking.date,
        data.nextBooking.time,
        data.nextBooking.price,
        data.nextBooking.status
      )
      : null;

    const stats = new DashboardStats(
      data.stats.total,
      data.stats.pending,
      data.stats.confirmed,
      data.stats.paid
    );

    return new Dashboard({
      nextBooking,
      stats,
    });
  }


  static toDto(dashboard: Dashboard): DashboardDto {
    return {
      nextBooking: dashboard.nextBooking
        ? {
          id: dashboard.nextBooking.id,
          serviceName: dashboard.nextBooking.serviceName,
          petName: dashboard.nextBooking.petName,
          petSize: dashboard.nextBooking.petSize as PetSize,
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
