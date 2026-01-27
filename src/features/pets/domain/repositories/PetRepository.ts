// src/features/pets/domain/repositories/PetRepository.ts

import { Pet } from "../entities/Pet";


export interface PetRepository {
  add(pet: Pet): Promise<void>;
  modify(pet: Pet): Promise<void>;
  delete(petId: string): Promise<void>;
  getByOwner(ownerId: string): Promise<Pet[]>;
}