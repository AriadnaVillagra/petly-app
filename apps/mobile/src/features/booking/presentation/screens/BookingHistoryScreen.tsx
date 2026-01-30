import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { BookingDTO } from '../../application/dto/BookingDTO';

export const BookingHistoryScreen = () => {
  const dispatch = useAppDispatch();
  const { bookings, loading } = useAppSelector(
    state => state.booking
  );

  useEffect(() => {
    // si ya los tenés cargados, esto puede ser opcional
    //dispatch(fetchBookings());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Cargando historial...</Text>
      </View>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No tenés bookings todavía 🐾</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: BookingDTO }) => (
    <View style={styles.card}>
      <Text style={styles.service}>{item.serviceName}</Text>
      <Text>Mascota: {item.petName}</Text>
      <Text>Tamaño: {item.petSize}</Text>
      <Text>
        {item.date} · {item.time}
      </Text>
      <Text>Duración: {item.durationMinutes} min</Text>
      <Text>Precio: ${item.price}</Text>
      <Text style={styles.status}>Estado: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  list: {
    paddingBottom: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  service: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  status: {
    marginTop: 4,
    fontStyle: 'italic',
  },
  errorText: {
    color: 'red',
  },
});
