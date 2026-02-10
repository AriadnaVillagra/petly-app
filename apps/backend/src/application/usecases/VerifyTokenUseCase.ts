// This file defines the use case for verifying a Cognito token and ensuring the corresponding user exists in the backend.
// src/application/usecases/AuthUseCases.ts

import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';

export interface CognitoTokenPayload {
  sub: string;
  email: string;
  name?: string;
}

export class VerifyTokenUseCase {
  constructor(
    private userRepo: UserRepository
  ) {}

  async execute(payload: CognitoTokenPayload): Promise<User> {
    let user = await this.userRepo.findById(payload.sub);

    if (!user) {
      // primer login → crear usuario en backend
      user = new User(
        payload.sub,
        payload.email,
        payload.name ?? 'Usuario'
      );

      await this.userRepo.save(user);
    }

    return user;
  }
}
