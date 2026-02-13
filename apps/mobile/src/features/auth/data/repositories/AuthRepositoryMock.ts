import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { User } from '../../domain/entities/User';

export class AuthRepositoryMock implements AuthRepository {
  forgotPassword(email: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  confirmForgotPassword(email: string, code: string, newPassword: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  resendConfirmationCode(email: string): Promise<void> {
    // Mock: asumimos que siempre reenvía bien
    return Promise.resolve();
  }

  async confirmAccount(
    _email: string,
    _code: string
  ): Promise<void> {
    // Mock: asumimos que siempre confirma bien
    return;
  }

  async getCurrentUser(): Promise<User | null> {
    return new User(
      'user-1',
      'Usuario Demo',
      'demo@email.com'
    );
  }

  async login(email: string, _password: string): Promise<User> {
    // Simula login exitoso el password no se usa por eso tiene un guion bajo
    return new User(
      'user-1',
      'Usuario Demo',
      email,
      '11-1234-5678'
    );
  }

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    // Simula registro exitoso
    return new User(
      Date.now().toString(),
      name,
      email
    );
  }

  async logout(): Promise<void> {
    // No hace nada en mock
    return;
  }
}
