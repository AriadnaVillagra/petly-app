import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ActivityIndicator,
    Pressable,
} from 'react-native';
import { register } from '../authSlice';
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";


interface Props {
    onGoLogin?: () => void;
    onRegistered?: (email: string) => void;
}

export const RegisterScreen = ({ onGoLogin, onRegistered }: Props) => {
    const dispatch = useAppDispatch();
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
        <View style={styles.container}>
            <Text style={styles.title}>Crear cuenta</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
            />

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

            {localError && (
                <Text style={styles.error}>{localError}</Text>
            )}

            {error && (
                <Text style={styles.error}>{error}</Text>
            )}

            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <Button title="Registrarse" onPress={handleRegister} />
            )}

            <Pressable onPress={onGoLogin} style={{ marginTop: 16 }}>
                <Text style={styles.switchText}>
                    ¿Ya tenés cuenta? Iniciar sesión
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
