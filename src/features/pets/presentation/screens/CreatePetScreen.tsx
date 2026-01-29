// src/features/pets/presentation/screens/CreatePetScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { PetSize } from '../../../../shared/types/PetSizes';
import { createPet } from '../petSlices';


export const CreatePetScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const user = useAppSelector(state => state.auth.user);

  const ownerId = user?.id;

  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [size, setSize] = useState<PetSize>('MEDIUM');

  const handleSubmit = async () => {
    if (!name || !breed || !ownerId) {
      console.warn('⛔ Datos incompletos', { name, breed, ownerId });
      return;
    }

    await dispatch(
      createPet({
        ownerId,
        name,
        breed,
        size,
      })
    );

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🐾 Nueva mascota</Text>

      <Text>Nombre</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ej: Luna"
      />

      <Text>Raza</Text>
      <TextInput
        style={styles.input}
        value={breed}
        onChangeText={setBreed}
        placeholder="Ej: Caniche"
      />

      <Text>Tamaño</Text>
      <View style={styles.sizes}>
        {(['SMALL', 'MEDIUM', 'LARGE'] as PetSize[]).map(s => (
          <Button
            key={s}
            title={s}
            onPress={() => setSize(s)}
            color={size === s ? '#4CAF50' : undefined}
          />
        ))}
      </View>
      <Button title="Guardar mascota" onPress={handleSubmit} />
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
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});
