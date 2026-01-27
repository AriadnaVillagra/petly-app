// src/features/auth/presentation/screens/AuthRoot.tsx
import React, { useState } from 'react';
import { LoginScreen } from './LoginScreen';
import { RegisterScreen } from './RegisterScreen';
import { ConfirmationAccountScreen } from './ConfirmationAccountScreen';


type AuthScreen = 'login' | 'register' | 'confirm';

export const AuthRoot = () => {
    const [screen, setScreen] = useState<AuthScreen>('login');
    const [emailToConfirm, setEmailToConfirm] = useState<string | null>(null);

    if (screen === 'register') {
        return (
            <RegisterScreen
                onGoLogin={() => setScreen('login')}
                onRegistered={(email) => {
                    setEmailToConfirm(email);
                    setScreen('confirm');
                }}
            />
        );
    }

    if (screen === 'confirm') {
        return (
            <ConfirmationAccountScreen
                email={emailToConfirm ?? undefined}
                onConfirmed={() => setScreen('login')}
                onGoLogin={() => setScreen('login')}
                onGoRegister={() => {
                    setEmailToConfirm(null);
                    setScreen('register');
                }}
            />
        );
    }
    
    return (
        <LoginScreen
            onGoRegister={() => setScreen('register')}
            onGoConfirm={(email) => {
                setEmailToConfirm(email);
                setScreen('confirm');
            }}
        />
    );
};
