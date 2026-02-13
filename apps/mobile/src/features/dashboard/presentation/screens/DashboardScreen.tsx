// src/features/dashboard/presentation/screens/DashboardScreen.tsx

import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { fetchDashboard } from '../dashboardSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../../app/navigation/MainStackParamList';
import { logout } from '../../../auth/presentation/authSlice';

type DashboardNavigationProp =
  NativeStackNavigationProp<MainStackParamList, 'Dashboard'>;

export const DashboardScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<DashboardNavigationProp>();
  const { data, loading, error } = useAppSelector(
    state => state.dashboard
  );

useFocusEffect(
  useCallback(() => {
    dispatch(fetchDashboard());
  }, [dispatch])
);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Cargando dashboard...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Reintentar" onPress={() => dispatch(fetchDashboard())} />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.center}>
        <Text>No hay datos disponibles</Text>
      </View>
    );
  }

  const nextBooking = data.nextBooking;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👋 Hola!</Text>

      {/* Próximo booking */}
      {nextBooking ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Próximo turno</Text>

          <Text>
            🐶 Mascota: {nextBooking.petName} ({nextBooking.petSize})
          </Text>

          <Text>
            ✂️ Servicio: {nextBooking.serviceName}
          </Text>

          <Text>
            📅 {nextBooking.date} a las {nextBooking.time}
          </Text>

          <Text>
            💰 Precio: ${nextBooking.price}
          </Text>

          <Text>
            📌 Estado: {nextBooking.status}
          </Text>
        </View>
      ) : (
        <View style={styles.card}>
          <Text>No tenés turnos agendados todavía 🐾</Text>
        </View>
      )}


      {/* Acciones */}
      <View style={styles.actions}>
        <Button
          title="Mis mascotas"
          onPress={() => navigation.navigate('PetsList')}
        />
        <Button
          title="Crear booking"
          onPress={() => navigation.navigate('CreateBooking')}
        />
        <Button
          title="Ver historial"
          onPress={() => navigation.navigate('BookingHistory')}
        />
      </View>

      {/* Resumen */}
      <View style={styles.card}>
        <Text>Total de bookings: {data.stats.total}</Text>
        <Text>Pendientes: {data.stats.pending}</Text>
        <Text>Confirmados: {data.stats.confirmed}</Text>
        <Text>Pagados: {data.stats.paid}</Text>
      </View>

      <Button
        title="Cerrar sesión"
        onPress={() => dispatch(logout())}
      />
    </View>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
  },
  actions: {
    gap: 12,
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
});
