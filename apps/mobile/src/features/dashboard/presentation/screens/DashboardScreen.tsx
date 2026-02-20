// src/features/dashboard/presentation/screens/DashboardScreen.tsx

import React, { useCallback, useEffect, useRef } from 'react';
import { ActivityIndicator, Animated } from 'react-native';
import { fetchDashboard } from '../dashboardSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../../app/navigation/MainStackParamList';
import { logout } from '../../../auth/presentation/authSlice';
import { ScreenContainer, Typography, Stack, Card, Button, useTheme } from '@petly/design-system';


type DashboardNavigationProp =
  NativeStackNavigationProp<MainStackParamList, 'Dashboard'>;

export const DashboardScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<DashboardNavigationProp>();
  const { data, loading, error } = useAppSelector(state => state.dashboard);
  const fade = useRef(new Animated.Value(0)).current

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchDashboard())
    }, [dispatch])
  )

  useEffect(() => {
    if (data) {
      fade.setValue(0)

      Animated.timing(fade, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }).start()
    }
  }, [data])

  if (loading) {
    return (
      <ScreenContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Typography>Cargando dashboard...</Typography>
      </ScreenContainer>
    );
  }

  if (error) {
    return (
      <ScreenContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Stack spacing="md">
          <Typography style={{ color: theme.colors.error }}>
            {error}
          </Typography>
          <Button
            title="Reintentar"
            onPress={() => dispatch(fetchDashboard())}
          />
        </Stack>
      </ScreenContainer>
    )
  }

  if (!data) {
    return (
      <ScreenContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Typography>No hay datos disponibles</Typography>
      </ScreenContainer>
    )
  }
  const nextBooking = data.nextBooking;

  return (
    <ScreenContainer style={{ padding: theme.spacing.lg }}>
      <Animated.View
        style={{
          opacity: fade,
          transform: [
            {
              translateY: fade.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0],
              }),
            },
          ],
        }}
      >

        <Stack spacing="lg">

          <Typography variant="title">
            👋 Hola!
          </Typography>

          {/* Próximo booking */}
          <Card>
            {nextBooking ? (
              <Stack spacing="sm">
                <Typography variant="title">
                  Próximo turno
                </Typography>

                <Typography>
                  🐶 {nextBooking.petName} ({nextBooking.petSize})
                </Typography>

                <Typography>
                  ✂️ {nextBooking.serviceName}
                </Typography>

                <Typography>
                  📅 {nextBooking.date} a las {nextBooking.time}
                </Typography>

                <Typography>
                  💰 ${nextBooking.price}
                </Typography>

                <Typography>
                  📌 {nextBooking.status}
                </Typography>
              </Stack>
            ) : (
              <Typography>
                No tenés turnos agendados todavía 🐾
              </Typography>
            )}
          </Card>


          {/* Acciones */}
          <Stack spacing="sm">
            <Button
              title="Mis mascotas"
              variant="secondary"
              onPress={() => navigation.navigate('PetsList')}
            />

            <Button
              title="Crear booking"
              variant="primary"
              onPress={() => navigation.navigate('CreateBooking')}
            />

            <Button
              title="Ver historial"
              variant="secondary"
              onPress={() => navigation.navigate('BookingHistory')}
            />
          </Stack>

          {/* Resumen */}
          <Card>
            <Stack spacing="xs">
              <Typography>
                Total: {data.stats.total}
              </Typography>
              <Typography>
                Pendientes: {data.stats.pending}
              </Typography>
              <Typography>
                Confirmados: {data.stats.confirmed}
              </Typography>
              <Typography>
                Pagados: {data.stats.paid}
              </Typography>
            </Stack>
          </Card>

          <Button
            title="Cerrar sesión"
            variant="secondary"
            onPress={() => dispatch(logout())}
          />

        </Stack>
      </Animated.View>
    </ScreenContainer >

  );
};
