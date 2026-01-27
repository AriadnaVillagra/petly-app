import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from '../store/hooks';
import { AuthRoot } from '../../features/auth/presentation/screens/AuthRoot';
import { MainNavigator } from './MainNavigator';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const user = useAppSelector(state => state.auth.user);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Auth" component={AuthRoot} />
      ) : (
        <Stack.Screen name="Main" component={MainNavigator} />
      )}
    </Stack.Navigator>
  );
};
