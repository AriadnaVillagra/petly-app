import React, { useEffect, useState } from 'react';
import { View, Text, Button, Modal, Pressable } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { cancelBooking, confirmBooking, createBooking } from '../bookingSlices';
import { ServiceSelector } from '../components/ServiceSelector';
import { SERVICES } from '../constants/services';
import { Service } from '../../domain/entities/Service';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getServiceDurationMinutes } from '../../domain/utils/serviceDuration';
import { getAvailableStartTimesWithBookings } from '../../domain/utils/scheduling';
import { fetchDashboard } from '../../../dashboard/presentation/dashboardSlice';
import { PetSize } from '../../../../shared/types/PetSizes';
import { fetchPetsByOwner } from '../../../pets/presentation/petSlices';
import { PetDTO } from '../../../pets/application/dto/PetDto';



export const CreateBookingScreen = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.booking.loading);
  const bookings = useAppSelector(state => state.booking.bookings);
  const pets = useAppSelector(state => state.pets.pets);
  const user = useAppSelector(state => state.auth.user);

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


  const handleConfirm = async (id: string) => {
    await dispatch(confirmBooking(id)).unwrap();
    dispatch(fetchDashboard());
  };

  const handleCancel = async (id: string) => {
    await dispatch(cancelBooking(id)).unwrap();
    dispatch(fetchDashboard());
  };
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
        price: selectedService.basePrice,
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
    <View style={{ flex: 1, padding: 24 }}>
      <Text style={{ fontSize: 22, marginBottom: 16 }}>
        🐾 Crear Booking
      </Text>

      <Text style={{ marginTop: 16, fontWeight: '600' }}>
        🐶 Seleccioná una mascota
      </Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {pets.map(pet => (
          <Pressable
            key={pet.id}
            onPress={() => setSelectedPet(pet)}
            style={{
              padding: 10,
              margin: 6,
              borderRadius: 8,
              backgroundColor:
                selectedPet?.id === pet.id ? '#4CAF50' : '#E0E0E0',
            }}
          >
            <Text
              style={{
                color: selectedPet?.id === pet.id ? 'white' : 'black',
                fontWeight: '600',
              }}
            >
              {pet.name}
            </Text>
            <Text style={{ fontSize: 12 }}>
              {pet.breed} · {pet.size}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Selector de servicio */}
      <ServiceSelector
        services={SERVICES}
        selectedService={selectedService}
        onSelect={setSelectedService}
      />

      {/* Selector de fecha */}
      <Button
        title={
          selectedDate
            ? `📅 Fecha: ${selectedDate}`
            : 'Seleccionar fecha'
        }
        onPress={() => setShowDatePicker(true)}
      />

      {/* Selector de hora */}
      <Button
        title={timeButtonTitle}
        disabled={!canOpenTimeModal}
        onPress={() => setShowTimeModal(true)}
      />

      <Modal
        visible={showTimeModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTimeModal(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 12,
              width: '80%',
              maxHeight: '70%',
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 12 }}>
              ⏰ Elegí un horario
            </Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {availableTimes.map(time => (
                <Pressable
                  key={time}
                  onPress={() => {
                    setSelectedTime(time);
                    setShowTimeModal(false);
                  }}
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    margin: 6,
                    borderRadius: 8,
                    backgroundColor:
                      selectedTime === time ? '#4CAF50' : '#E0E0E0',
                  }}
                >
                  <Text
                    style={{
                      color: selectedTime === time ? 'white' : 'black',
                      fontWeight: '600',
                    }}
                  >
                    {time}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Button
              title="Cancelar"
              onPress={() => setShowTimeModal(false)}
            />
          </View>
        </View>
      </Modal>


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
      <Button
        title="Crear turno"
        onPress={handleCreateBooking}
        disabled={
          !selectedService ||
          !selectedPet ||
          !selectedDate ||
          !selectedTime ||
          loading
        }
      />
    </View>
  );
};
