// src/infrastructure/persistence/PetMemoryRepository.ts

import { Pet } from "../../domain/entities/Pet";
import { PetRepository } from "../../domain/repositories/PetRepository";

export class PetMemoryRepository implements PetRepository {
    private pets: Pet[] = [];

    save(pet: Pet): Promise<Pet> {
        this.pets.push(pet);
        return Promise.resolve(pet);
    }

    findByOwner(ownerId: string): Promise<Pet[]> {
        const ownerPets = this.pets.filter(pet => pet.ownerId === ownerId);
        return Promise.resolve(ownerPets);
    }
    
    findById(petId: string): Promise<Pet | null> {
        const pet = this.pets.find(p => p.id === petId);
        return Promise.resolve(pet || null);
    }

    modify(pet: Pet): Promise<Pet> {
        const index = this.pets.findIndex(p => p.id === pet.id);
        if (index !== -1) {
            this.pets[index] = pet;
            return Promise.resolve(pet);
        }
        throw new Error("Pet not found");
    }

    delete(petId: string): Promise<void> {
        this.pets = this.pets.filter(pet => pet.id !== petId);
        return Promise.resolve();
    }

}
