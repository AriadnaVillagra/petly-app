// src/features/pets/presentation/screens/PetsListScreen.tsx

import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { MainStackParamList } from '../../../../app/navigation/MainStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { fetchPetsByOwner } from '../petSlices';
import { useTheme, ScreenContainer, Typography, Stack, Card, Button } from '@petly/design-system';

type PetsListNavigationProp =
  NativeStackNavigationProp<MainStackParamList, 'PetsList'>;

export const PetsListScreen = () => {
  const theme = useTheme();
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
    <ScreenContainer style={{ padding: theme.spacing.lg }}>

      <Stack spacing="lg">

        <Typography variant="title">
          🐾 Mis mascotas
        </Typography>

        {pets.length === 0 && (
          <Typography>
            No tenés mascotas cargadas todavía.
          </Typography>
        )}

        <Stack spacing="sm">
          <FlatList
            data={pets}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Card>
                <Stack spacing="xs">
                  <Typography>
                    {item.name}
                  </Typography>

                  <Typography
                    style={{ color: theme.colors.mutedText }}
                  >
                    {item.breed}
                  </Typography>
                </Stack>
              </Card>
            )}
          />
        </Stack>

        <Button
          title="+ Agregar mascota"
          variant="primary"
          onPress={() => navigation.navigate('CreatePet')}
        />

      </Stack>

    </ScreenContainer>
  )
    ;
};
