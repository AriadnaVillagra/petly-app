//src/domain/repositories/PetRepository.ts
//Interface defining the contract for Pet repository implementations

import { Pet } from "../entities/Pet";

export interface PetRepository {
    save(pet: Pet): Promise<Pet>;
    findByOwner(ownerId: string): Promise<Pet[]>;
    findById(petId: string): Promise<Pet | null>;
    modify(pet: Pet): Promise<Pet>;
    delete(petId: string): Promise<void>;
}