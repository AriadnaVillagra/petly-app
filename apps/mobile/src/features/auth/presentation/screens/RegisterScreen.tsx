import { useState } from "react";
import { ActivityIndicator } from 'react-native';
import { register } from '../authSlice';
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";
import { ScreenContainer, LinkText, Stack, Typography, Input, useTheme, Button } from '@petly/design-system';

interface Props {
    onGoLogin?: () => void;
    onRegistered?: (email: string) => void;
}

export const RegisterScreen = ({ onGoLogin, onRegistered }: Props) => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const { loading, error } = useAppSelector(state => state.auth);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState<string | null>(null);

    const isValidPassword = (password: string) => {
        return (
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[^A-Za-z0-9]/.test(password)
        );
    };

    const handleRegister = () => {
        if (!name || !email || !password) {
            setLocalError('Completá todos los campos');
            return;
        }

        if (!isValidPassword(password)) {
            setLocalError(
                'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo'
            );
            return;
        }
        setLocalError(null);
        dispatch(register({ name, email, password }))
            .unwrap()
            .then(() => {
                onRegistered?.(email);
            })
            .catch(() => { });

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
                    Crear cuenta
                </Typography>

                <Stack spacing="sm">
                    <Input
                        placeholder="Nombre"
                        value={name}
                        onChangeText={setName}
                    />

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

                {loading ? (
                    <ActivityIndicator />
                ) : (
                    <Button
                        title="Registrarse"
                        variant="primary"
                        onPress={handleRegister}
                    />
                )}

                <LinkText onPress={onGoLogin}>
                    ¿Ya tenés cuenta? Iniciar sesión
                </LinkText>

            </Stack>
        </ScreenContainer>
    );
};