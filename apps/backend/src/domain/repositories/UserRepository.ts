// This file defines the UserRepository interface, which specifies the methods for accessing and manipulating user data in the system.
// src/domain/repositories/UserRepository.ts

import { User } from '../entities/User';

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
