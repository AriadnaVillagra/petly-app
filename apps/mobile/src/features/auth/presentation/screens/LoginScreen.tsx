import { ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { login } from '../authSlice';
import { ScreenContainer, Stack, useTheme, Typography, Input, LinkText, Button } from '@petly/design-system';
interface Props {
  onGoRegister?: () => void;
  onGoConfirm?: (email: string) => void;
  onGoForgotPassword?: () => void;
}


export const LoginScreen = ({ onGoRegister, onGoConfirm, onGoForgotPassword }: Props) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { loading, error, requiresConfirmation, emailToConfirm } = useAppSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleLogin = () => {
    if (!email || !password) return;

    dispatch(login({ email, password }));
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
          Iniciar sesión
        </Typography>

        <Stack spacing="sm">
          <Input
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Input
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </Stack>

        {error && (
          <Typography
            style={{
              color: theme.colors.error,
              textAlign: 'center',
            }}
          >
            {error}
          </Typography>
        )}

        {requiresConfirmation && emailToConfirm && (
          <Button
            title="Confirmar cuenta"
            variant="secondary"
            onPress={() => onGoConfirm?.(emailToConfirm)}
          />
        )}

        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button
            title="Ingresar"
            variant="primary"
            onPress={handleLogin}
          />
        )}

        <Stack spacing="sm">
          <LinkText onPress={onGoRegister}>
            ¿No tenés cuenta? Registrate
          </LinkText>

          {!requiresConfirmation && (
            <LinkText onPress={onGoForgotPassword}>
              ¿Olvidaste tu contraseña?
            </LinkText>
          )}
        </Stack>

      </Stack>
    </ScreenContainer>
  );

};