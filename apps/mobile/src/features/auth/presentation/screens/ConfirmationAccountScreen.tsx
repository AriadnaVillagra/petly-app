import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";
import { confirmAccount, resendConfirmationCode } from "../authSlice";
import { ActivityIndicator, Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
    email?: string;
    onConfirmed: () => void;
    onGoLogin: () => void;
    onGoRegister: () => void;
}

export const ConfirmationAccountScreen = ({ email, onConfirmed, onGoLogin, onGoRegister }: Props) => {
    const dispatch = useAppDispatch();
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
                confirmAccount({ email: emailState, code })
            ).unwrap();

            setSuccess(true);
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
        <View style={styles.container}>
            <Text style={styles.title}>Confirmar cuenta</Text>

            <Text style={styles.subtitle}>
                Ingresá el código que te enviamos por email
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                value={emailState}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Código de verificación"
                keyboardType="number-pad"
                value={code}
                onChangeText={setCode}
            />

            {localError && (
                <Text style={styles.errorText}>
                    {localError}
                </Text>
            )}

            {success && (
                <Text style={styles.successText}>
                    ✅ Cuenta confirmada correctamente
                </Text>
            )}

            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <Button title="Confirmar cuenta" onPress={handleConfirm} />
            )}

            <Pressable
                onPress={handleResendCode}
                style={{ marginTop: 16 }}
            >
                <Text style={styles.linkText}>
                    Reenviar código
                </Text>
            </Pressable>

            <Pressable
                onPress={onGoLogin}
                style={{ marginTop: 24 }}
            >
                <Text style={styles.linkText}>
                    ← Volver a iniciar sesión
                </Text>
            </Pressable>

            <Pressable
                onPress={onGoRegister}
                style={{ marginTop: 8 }}
            >
                <Text style={styles.linkText}>
                    Crear otra cuenta
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
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        textAlign: 'center',
        marginBottom: 24,
        color: '#666',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    errorText: {
        color: 'red',
        marginBottom: 12,
        textAlign: 'center',
    },
    successText: {
        color: 'green',
        marginBottom: 12,
        textAlign: 'center',
    },
    linkText: {
        textAlign: 'center',
        color: '#1976D2',
        fontWeight: '500',
    },
});


