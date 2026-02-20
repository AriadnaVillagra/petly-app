import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { createBooking } from '../bookingSlice';
import { ServiceSelector } from '../components/ServiceSelector';
import { SERVICES } from '../constants/services';
import { Service } from '../../domain/entities/Service';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getServiceDurationMinutes } from '../../domain/utils/serviceDuration';
import { getAvailableStartTimesWithBookings } from '../../domain/utils/scheduling';
import { PetSize } from '../../../../shared/types/PetSizes';
import { fetchPetsByOwner } from '../../../pets/presentation/petSlices';
import { PetDTO } from '../../../pets/application/dto/PetDto';
import { ScreenContainer, Typography, useTheme, Section, SelectableChip, Stack, ModalCard, Button } from '@petly/design-system';

export const CreateBookingScreen = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.booking.loading);
  const bookings = useAppSelector(state => state.booking.bookings);
  const pets = useAppSelector(state => state.pets.pets);
  const user = useAppSelector(state => state.auth.user);
  const theme = useTheme()

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedPet, setSelectedPet] = useState<PetDTO | null>(null);

  const petSize: PetSize | null = selectedPet?.size ?? null;

  useEffect(() => {
    setSelectedTime('');
    if (user) {
      dispatch(fetchPetsByOwner(user.id));
    }
  }, [selectedService]);

  const activeBookings = bookings.filter(
    b => b.status !== 'CANCELLED'
  );

  const durationMinutes =
    selectedService && petSize
      ? getServiceDurationMinutes(selectedService.type, petSize)
      : null;

  const availableTimes =
    selectedService && selectedDate && durationMinutes
      ? getAvailableStartTimesWithBookings(
        durationMinutes,
        activeBookings,
        selectedDate
      )
      : [];

  const handleCreateBooking = () => {
    if (!selectedService || !selectedDate || !selectedTime || !selectedPet) return;

    dispatch(
      createBooking({
        id: Date.now().toString(),
        petId: selectedPet.id,
        petName: selectedPet.name,
        petSize: selectedPet.size,
        userId: user?.id ?? '',
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
        durationMinutes: getServiceDurationMinutes(selectedService.type, petSize),
      })
    );
    setSelectedDate('');
    setSelectedTime('');
  };


  const canOpenTimeModal =
    !!selectedService &&
    !!selectedPet &&
    !!selectedDate &&
    availableTimes.length > 0;

  const isCreateDisabled =
    !selectedService ||
    !selectedPet ||
    !selectedDate ||
    !selectedTime ||
    loading

  const timeButtonTitle = selectedTime
    ? `⏰ Hora: ${selectedTime}`
    : !selectedService
      ? 'Primero seleccioná un servicio'
      : !selectedDate
        ? 'Seleccioná una fecha'
        : availableTimes.length === 0
          ? 'Sin horarios disponibles'
          : 'Seleccionar horario';



  return (
    <ScreenContainer style={{ padding: theme.spacing.lg }}>

      <Typography variant="title">
        🐾 Crear Booking
      </Typography>

      <Section title="🐶 Seleccioná una mascota">
        <Stack direction="row" wrap spacing="sm">
          {pets.map(pet => (
            <SelectableChip
              key={pet.id}
              label={pet.name}
              subLabel={`${pet.breed} · ${pet.size}`}
              selected={selectedPet?.id === pet.id}
              onPress={() => setSelectedPet(pet)}
            />
          ))}
        </Stack>
      </Section>

      {/* Selector de servicio */}
      <ServiceSelector
        services={SERVICES}
        selectedService={selectedService}
        onSelect={setSelectedService}
      />

      {/* Selector de fecha */}
      <Section title="📅 Fecha">
        <Button
          title={
            selectedDate
              ? `Fecha: ${selectedDate}`
              : 'Seleccionar fecha'
          }
          onPress={() => setShowDatePicker(true)}
        />
      </Section>

      {/* Selector de hora */}
      <Section title="⏰ Horario">
        <Button
          title={timeButtonTitle}
          disabled={!canOpenTimeModal}
          onPress={() => setShowTimeModal(true)}
        />
      </Section>

      {/* Modal de horarios */}
      <ModalCard
        visible={showTimeModal}
        onClose={() => setShowTimeModal(false)}
      >
        <Typography variant="title">
          ⏰ Elegí un horario
        </Typography>

        <Stack direction="row" wrap spacing="sm">
          {availableTimes.map(time => (
            <SelectableChip
              key={time}
              label={time}
              selected={selectedTime === time}
              onPress={() => {
                setSelectedTime(time)
                setShowTimeModal(false)
              }}
            />
          ))}
        </Stack>

        <Button
          title="Cancelar"
          variant="secondary"
          onPress={() => setShowTimeModal(false)}
        />
      </ModalCard>


      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={new Date()}
          onChange={(_, date) => {
            setShowDatePicker(false);
            if (date) {
              setSelectedDate(date.toISOString().split('T')[0]); // YYYY-MM-DD
            }
          }}
        />
      )}

      {/* Time Picker */}
      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={new Date()}
          onChange={(_, date) => {
            setShowTimePicker(false);
            if (date) {
              const hours = date.getHours().toString().padStart(2, '0');
              const minutes = date.getMinutes().toString().padStart(2, '0');
              setSelectedTime(`${hours}:${minutes}`);
            }
          }}
        />
      )}

      {/* Crear booking */}
      <Stack spacing="lg">
        <Button
          title="Crear turno"
          variant="primary"
          onPress={handleCreateBooking}
          disabled={isCreateDisabled}
        />
      </Stack>
    </ScreenContainer>
  );
};
