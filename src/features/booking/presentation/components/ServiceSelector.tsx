import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Service } from '../../domain/entities/Service';

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
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>
        Servicio
      </Text>

      {services.map(service => {
        const isSelected = selectedService?.id === service.id;

        return (
          <TouchableOpacity
            key={service.id}
            onPress={() => onSelect(service)}
            style={{
              padding: 12,
              marginBottom: 8,
              borderWidth: 1,
              borderRadius: 8,
              backgroundColor: isSelected ? '#e0f7fa' : '#fff',
            }}
          >
            <Text style={{ fontSize: 16 }}>
              {service.name}
            </Text>
            <Text style={{ color: '#666' }}>
              ${service.basePrice}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
