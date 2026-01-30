import { User } from '../entities/User';

export interface AuthRepository {
    login(email: string, password: string): Promise<User>;
    register(name: string, email: string, password: string): Promise<User>;
    logout(): Promise<void>;
    getCurrentUser(): Promise<User | null>;
    confirmAccount(email: string, code: string): Promise<void>;
    resendConfirmationCode(email: string): Promise<void>;
}
