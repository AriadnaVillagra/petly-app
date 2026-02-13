// src/features/pets/presentation/screens/PetsListScreen.tsx

import React, { useCallback } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { MainStackParamList } from '../../../../app/navigation/MainStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { fetchPetsByOwner } from '../petSlices';

type PetsListNavigationProp =
  NativeStackNavigationProp<MainStackParamList, 'PetsList'>;

export const PetsListScreen = () => {
  const { pets } = useAppSelector(state => state.pets);
  const navigation = useNavigation<PetsListNavigationProp>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const ownerId = user?.id;

  useFocusEffect(
    useCallback(() => {
      if (ownerId) {
        dispatch(fetchPetsByOwner(ownerId));
      }
    }, [dispatch, ownerId])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🐾 Mis mascotas</Text>

      {pets.length === 0 && (
        <Text>No tenés mascotas cargadas todavía.</Text>
      )}

      <FlatList
        data={pets}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.name}</Text>
            <Text>{item.breed}</Text>
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
