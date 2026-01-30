import { PetSize } from '../../../pets/domain/entities/Pet';
import { ServiceType } from '../entities/Service';

export const getServiceDurationMinutes = (
  serviceId: ServiceType,
  petSize: PetSize
): number => {
  switch (serviceId) {
    case 'BATH':
      if (petSize === 'SMALL') return 60;
      if (petSize === 'MEDIUM') return 90;
      return 120;

    case 'BATH_AND_CUT':
    case 'STRIPPING':
      if (petSize === 'SMALL') return 90;
      if (petSize === 'MEDIUM') return 120;
      return 150;

    case 'HYGIENIC_CUT':
      return 30;

    case 'NAIL_TRIM':
      return 30;

    default:
      return 60;
  }
};
