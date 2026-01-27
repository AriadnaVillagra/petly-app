import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { fetchPetsByOwner } from '../pethSlices';

interface Props {
  navigation: any;
}

export const PetsListScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const { pets, loading } = useAppSelector(state => state.pets);

  const userId = 'user-1'; // luego vendrá de auth

  useEffect(() => {
    dispatch(fetchPetsByOwner(userId));
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🐾 Mis mascotas</Text>

      {loading && <Text>Cargando...</Text>}

      {!loading && pets.length === 0 && (
        <View style={styles.empty}>
          <Text>No tenés mascotas cargadas todavía.</Text>
          <Text>Agregá una para poder reservar turnos 🐶🐱</Text>
        </View>
      )}

      <FlatList
        data={pets}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.breed}</Text>
            <Text>Tamaño: {item.size}</Text>
          </View>
        )}
      />

      <Button
        title="+ Agregar mascota"
        onPress={() => navigation.navigate('CreatePet')}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
  },
  card: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginBottom: 8,
  },
  name: {
    fontWeight: '600',
  },
  empty: {
    marginVertical: 16,
  },
});
