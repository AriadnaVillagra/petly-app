import React from 'react';
import { Service } from '../../domain/entities/Service';
import { SelectableChip, Stack, Section } from '@petly/design-system';

interface Props {
  services: Service[];
  selectedService: Service | null;
  onSelect: (service: Service) => void;
}

export const ServiceSelector = ({
  services,
  selectedService,
  onSelect,
}: Props) => {
  return (
    <Section title="Servicio">
      <Stack spacing="sm">
        {services.map(service => (
          <SelectableChip
            key={service.id}
            label={service.name}
            subLabel={`$${service.basePrice}`}
            selected={selectedService?.id === service.id}
            onPress={() => onSelect(service)}
          />
        ))}
      </Stack>
    </Section>
  )
}