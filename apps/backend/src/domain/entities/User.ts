// This file defines the User entity, which represents a user in the system.
// src/domain/entities/User.ts

export class User {
  constructor(
    public readonly id: string,      // cognito sub
    public readonly email: string,
    public readonly name: string,
    public readonly role: 'USER' | 'ADMIN' = 'USER'
  ) {}
}
