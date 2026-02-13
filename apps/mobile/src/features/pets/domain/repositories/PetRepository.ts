// src/features/pets/domain/repositories/PetRepository.ts

import { Pet } from "../entities/Pet";


export interface PetRepository {
  add(pet: Pet): Promise<Pet>;
  modify(pet: Pet): Promise<Pet>;
  delete(petId: string): Promise<void>;
  getByOwner(): Promise<Pet[]>;
}