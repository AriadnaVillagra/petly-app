// src/features/pets/data/repositories/PetRepositoryMock.ts

import { Pet } from "../../domain/entities/Pet";
import { PetRepository } from "../../domain/repositories/PetRepository";

export class PetRepositoryMock implements PetRepository {
    private pets: Pet[] = [];

    async getByOwner(ownerId: string): Promise<Pet[]> {
      return this.pets.filter(pet => pet.ownerId === ownerId);
    }
    async modify(pet: Pet): Promise<void> {
       this.pets = this.pets.map(p => p.id === pet.id ? pet : p);
    }
    async delete(petId: string): Promise<void> {
       this.pets = this.pets.filter(pet => pet.id !== petId);
    }

    async add(pet: Pet): Promise<void> {
        this.pets.push(pet);
    }
}