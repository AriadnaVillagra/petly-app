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
import { login } from '../authSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';

export const LoginScreen = ({ onGoRegister, onGoConfirm }: {
  onGoRegister?: () => void;
  onGoConfirm?: (email: string) => void;
}) => {
  const dispatch = useAppDispatch();
  const { loading, error, requiresConfirmation, emailToConfirm } = useAppSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleLogin = () => {
    if (!email || !password) return;

    dispatch(login({ email, password }));
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error && (
        <Text style={styles.error}>{error}</Text>
      )}

      {requiresConfirmation && emailToConfirm && (
        <View style={{ marginBottom: 12 }}>
          <Button
            title="Confirmar cuenta"
            onPress={() => onGoConfirm?.(emailToConfirm)}
          />
        </View>
      )}

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Ingresar" onPress={handleLogin} />
      )}

      <Pressable onPress={onGoRegister} style={{ marginTop: 16 }}>
        <Text style={styles.switchText}>
          ¿No tenés cuenta? Registrate
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
  switchText: {
    textAlign: 'center',
    color: '#1976D2',
    fontWeight: '500',
  },
});