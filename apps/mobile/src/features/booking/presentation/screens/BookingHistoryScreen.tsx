//  apps/mobile/src/features/booking/presentation/screens/BookingHistoryScreen.tsx

import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  FlatList,
  ActivityIndicator,
  Linking,
  Alert,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { BookingDTO } from '../../application/dto/BookingDTO';
import { createPreferenceThunk } from '../../../payment/presentation/paymentSlice';
import { fetchBookingsByUser } from '../bookingSlice';
import { ScreenContainer, Button, useTheme, Typography, Card } from '@petly/design-system';

export const BookingHistoryScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { bookings, loading } = useAppSelector(
    state => state.booking
  );
  const user = useAppSelector(state => state.auth.user);
  const handlePay = async (id: string) => {
    try {
      const result = await dispatch(createPreferenceThunk(id)).unwrap();
      await Linking.openURL(result.initPoint);
    } catch (error) {
      console.error("Error creating payment preference:", error);
      Alert.alert("Error", "No se pudo iniciar el pago. Intentá nuevamente.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (user) {
        dispatch(fetchBookingsByUser(user.id));
      }
    }, [dispatch, user])
  );

  if (loading) {
    return (
      <ScreenContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Typography>Cargando historial...</Typography>
      </ScreenContainer>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <ScreenContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Typography>No tenés bookings todavía 🐾</Typography>
      </ScreenContainer>
    );
  }

  const renderItem = ({ item }: { item: BookingDTO }) => (
    <Card>
      <Typography variant="title">
        {item.serviceName}
      </Typography>

      <Typography>Mascota: {item.petName}</Typography>
      <Typography>Tamaño: {item.petSize}</Typography>
      <Typography>
        {item.date} · {item.time}
      </Typography>
      <Typography>Duración: {item.durationMinutes} min</Typography>
      <Typography>Precio: ${item.price}</Typography>

      <Typography
        style={{
          marginTop: theme.spacing.sm,
          color:
            item.status === 'PENDING_PAYMENT'
              ? theme.colors.error
              : theme.colors.text,
        }}
      >
        Estado: {item.status}
      </Typography>

      {item.status === 'PENDING_PAYMENT' && (
        <Button
          title="💳 Pagar turno"
          onPress={() => handlePay(item.id)}
          style={{ marginTop: theme.spacing.md }}
        />
      )}
    </Card>
  )

  return (
    <ScreenContainer>
      <FlatList
        data={bookings}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: theme.spacing.md }}
      />
    </ScreenContainer>
  );
};