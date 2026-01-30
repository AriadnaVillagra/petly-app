import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { AuthRoot } from '../../features/auth/presentation/screens/AuthRoot';
import { MainNavigator } from './MainNavigator';
import { SplashScreen } from '../../shared/presentation/SplashScreen';
import { bootstrapAuth } from '../../features/auth/presentation/authSlice';

type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(bootstrapAuth());
  }, [dispatch]);

  if (loading) {
    return <SplashScreen />;
  }

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
