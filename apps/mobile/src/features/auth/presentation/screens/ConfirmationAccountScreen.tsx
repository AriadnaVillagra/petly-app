import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";
import { confirmAccount, resendConfirmationCode } from "../authSlice";
import { ActivityIndicator } from "react-native";
import { ScreenContainer, useTheme, Stack, Typography, Input, Button, LinkText } from '@petly/design-system';
interface Props {
    email?: string;
    onConfirmed: () => void;
    onGoLogin: () => void;
    onGoRegister: () => void;
}

export const ConfirmationAccountScreen = ({ email, onConfirmed, onGoLogin, onGoRegister }: Props) => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const { loading } = useAppSelector(state => state.auth);
    const [code, setCode] = useState('');
    const [emailState, setEmail] = useState(email ?? '');
    const [localError, setLocalError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);


    const handleConfirm = async () => {
        if (!emailState || !code) {
            setLocalError('Completá todos los campos');
            return;
        }

        try {
            await dispatch(
                confirmAccount({
                    email: emailState,
                    code,
                })
            ).unwrap();

            setSuccess(true);

            // opcional: login automático después de confirmar
            onConfirmed();

        } catch (err: any) {
            setLocalError(err?.message ?? 'Error al confirmar la cuenta');
        }
    };


    const handleResendCode = async () => {
        if (!emailState) {
            setLocalError('Ingresá tu email para reenviar el código');
            return;
        }

        console.log('📨 UI → Reenviar código a:', emailState);

        try {
            await dispatch(
                resendConfirmationCode({ email: emailState })
            ).unwrap();
            console.log('✅ UI → Código reenviado OK');
        } catch (err: any) {
            console.error('❌ UI → Error reenviando código:', err);
            setLocalError(err?.message ?? 'Error al reenviar el código');
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
                    Confirmar cuenta
                </Typography>

                <Typography
                    style={{
                        textAlign: 'center',
                        color: theme.colors.mutedText,
                    }}
                >
                    Ingresá el código que te enviamos por email
                </Typography>

                <Stack spacing="sm">
                    <Input
                        placeholder="Email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        value={emailState}
                        onChangeText={setEmail}
                    />

                    <Input
                        placeholder="Código de verificación"
                        keyboardType="number-pad"
                        value={code}
                        onChangeText={setCode}
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

                {success && (
                    <Typography
                        style={{
                            color: theme.colors.success,
                            textAlign: 'center',
                        }}
                    >
                        ✅ Cuenta confirmada correctamente
                    </Typography>
                )}

                {loading ? (
                    <ActivityIndicator />
                ) : (
                    <Button
                        title="Confirmar cuenta"
                        variant="primary"
                        onPress={handleConfirm}
                    />
                )}

                <Stack spacing="sm">
                    <LinkText onPress={handleResendCode}>
                        Reenviar código
                    </LinkText>

                    <LinkText onPress={onGoLogin}>
                        ← Volver a iniciar sesión
                    </LinkText>

                    <LinkText onPress={onGoRegister}>
                        Crear otra cuenta
                    </LinkText>
                </Stack>

            </Stack>
        </ScreenContainer>
    )
        ;
};

