// src/features/auth/presentation/screens/ForgotPasswordScreen.tsx

import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import {
  forgotPassword,
  confirmForgotPassword,
  login,
} from '../authSlice';
import { useTheme, ScreenContainer, Stack, Typography, Input, Button, LinkText } from '@petly/design-system';
interface Props {
  onGoLogin: () => void;
}

export const ForgotPasswordScreen = ({ onGoLogin }: Props) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { loading, error } = useAppSelector(state => state.auth);

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState<'request' | 'confirm'>('request');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleRequestCode = async () => {
    if (!email) {
      setLocalError('Ingresá tu email');
      return;
    }

    setLocalError(null);

    try {
      await dispatch(forgotPassword({ email })).unwrap();
      setStep('confirm');
    } catch (err: any) {
      setLocalError(err?.message ?? 'Error al enviar el código');
    }
  };

  const handleConfirmPassword = async () => {
    if (!email || !code || !newPassword) {
      setLocalError('Completá todos los campos');
      return;
    }

    try {
      await dispatch(
        confirmForgotPassword({
          email,
          code,
          newPassword,
        })
      ).unwrap();

      // 🔥 login automático con nueva contraseña
      await dispatch(
        login({
          email,
          password: newPassword,
        })
      ).unwrap();

    } catch (err: any) {
      setLocalError(err?.message ?? 'Error al cambiar la contraseña');
    }
  };


  return (
    <ScreenContainer
      style={{
        padding: theme.spacing.lg,
        justifyContent: 'center',
      }}
    >
      <Stack spacing="lg">

        <Typography
          variant="title"
          style={{ textAlign: 'center' }}
        >
          Recuperar contraseña
        </Typography>

        {step === 'request' && (
          <Stack spacing="sm">

            <Input
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            {localError && (
              <Typography
                style={{
                  color: theme.colors.error,
                  textAlign: 'center',
                }}
              >
                {localError}
              </Typography>
            )}

            {loading ? (
              <ActivityIndicator />
            ) : (
              <Button
                title="Enviar código"
                variant="primary"
                onPress={handleRequestCode}
              />
            )}

          </Stack>
        )}

        {step === 'confirm' && (
          <Stack spacing="sm">

            <Input
              placeholder="Código de verificación"
              keyboardType="number-pad"
              value={code}
              onChangeText={setCode}
            />

            <Input
              placeholder="Nueva contraseña"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />

            {localError && (
              <Typography
                style={{
                  color: theme.colors.error,
                  textAlign: 'center',
                }}
              >
                {localError}
              </Typography>
            )}

            {loading ? (
              <ActivityIndicator />
            ) : (
              <Button
                title="Confirmar nueva contraseña"
                variant="primary"
                onPress={handleConfirmPassword}
              />
            )}

          </Stack>
        )}

        <LinkText onPress={onGoLogin}>
          ← Volver a iniciar sesión
        </LinkText>

      </Stack>
    </ScreenContainer>
  );
};