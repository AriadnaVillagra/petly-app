// src/app/navigation/MainNavigator.tsx

import React from 'react';
import { DashboardScreen } from '../../features/dashboard/presentation/screens/DashboardScreen';
import { CreateBookingScreen } from '../../features/booking/presentation/screens/BookingScreen';
import { MainStackParamList } from './MainStackParamList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BookingHistoryScreen } from '../../features/booking/presentation/screens/BookingHistoryScreen';
import { PetsListScreen } from '../../features/pets/presentation/screens/PetsListScreen';
import { CreatePetScreen } from '../../features/pets/presentation/screens/CreatePetScreen';


const Stack = createNativeStackNavigator<MainStackParamList>();

//PARA FUTURAS SCREENS, AGREGARLAS A MainStackParamList.ts Y A ESTE ARCHIVO

export const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="CreateBooking"
        component={CreateBookingScreen}
        options={{ title: 'Nuevo turno' }}
      />
      <Stack.Screen
        name="BookingHistory"
        component={BookingHistoryScreen}
        options={{ title: 'Historial' }}
      />
      <Stack.Screen
        name="PetsList"
        component={PetsListScreen}
        options={{ title: 'Mis mascotas' }}
      />
      <Stack.Screen
        name="CreatePetScreen"
        component={CreatePetScreen}
        options={{ title: 'Crear mascota' }}
      />
    </Stack.Navigator>


  );
};
