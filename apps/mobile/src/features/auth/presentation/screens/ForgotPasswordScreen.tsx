// src/features/auth/presentation/screens/ForgotPasswordScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import {
  forgotPassword,
  confirmForgotPassword,
  login,
} from '../authSlice';

interface Props {
  onGoLogin: () => void;
}

export const ForgotPasswordScreen = ({ onGoLogin }: Props) => {
  const dispatch = useAppDispatch();
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
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar contraseña</Text>

      {step === 'request' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          {localError && (
            <Text style={styles.error}>{localError}</Text>
          )}

          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <Button title="Enviar código" onPress={handleRequestCode} />
          )}
        </>
      )}

      {step === 'confirm' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Código de verificación"
            keyboardType="number-pad"
            value={code}
            onChangeText={setCode}
          />

          <TextInput
            style={styles.input}
            placeholder="Nueva contraseña"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />

          {localError && (
            <Text style={styles.error}>{localError}</Text>
          )}

          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <Button
              title="Confirmar nueva contraseña"
              onPress={handleConfirmPassword}
            />
          )}
        </>
      )}

      <Pressable onPress={onGoLogin} style={{ marginTop: 24 }}>
        <Text style={styles.linkText}>
          ← Volver a iniciar sesión
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  error: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
  linkText: {
    textAlign: 'center',
    color: '#1976D2',
    fontWeight: '500',
  },
});
