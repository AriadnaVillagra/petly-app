import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { User } from '../../domain/entities/User';

export class AuthUseCases {
  constructor(
    private readonly repository: AuthRepository
  ) { }

  login(email: string, password: string): Promise<User> {
    return this.repository.login(email, password);
  }

  register(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    return this.repository.register(name, email, password);
  }

  logout(): Promise<void> {
    return this.repository.logout();
  }

  getCurrentUser(): Promise<User | null> {
    return this.repository.getCurrentUser();
  }

  confirmAccount(email: string, code: string): Promise<void> {
    return this.repository.confirmAccount(email, code);
  }

  resendConfirmationCode(email: string): Promise<void> {
    return this.repository.resendConfirmationCode(email);
  }

  forgotPassword(email: string): Promise<void> {
    return this.repository.forgotPassword(email);
  }

  confirmForgotPassword(email: string, code: string, newPassword: string): Promise<void> {
    return this.repository.confirmForgotPassword(email, code, newPassword);
  }
}
