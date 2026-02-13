// src/features/pets/data/repositories/PetRepositoryMock.ts

import { Pet } from "../../domain/entities/Pet";
import { PetRepository } from "../../domain/repositories/PetRepository";

export class PetRepositoryMock implements PetRepository {
    private pets: Pet[] = [];

    async getByOwner(): Promise<Pet[]> {
        return this.pets;
    }

    async add(pet: Pet): Promise<Pet> {
        this.pets.push(pet);
        return pet;
    }

    async modify(pet: Pet): Promise<Pet> {
        this.pets = this.pets.map(p =>
            p.id === pet.id ? pet : p
        );
        return pet;
    }

    async delete(petId: string): Promise<void> {
        this.pets = this.pets.filter(p =>
            p.id !== petId
        );
    }
}
