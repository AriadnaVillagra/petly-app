// src/features/pets/application/usecases/petUsecases.ts

import { PetSize } from "../../../../shared/types/PetSizes";
import { Pet } from "../../domain/entities/Pet";
import { PetRepository } from "../../domain/repositories/PetRepository";
import { v4 as uuidv4 } from 'uuid';


export interface CreatePetParams {
    ownerId: string;
    name: string;
    breed: string;
    size: PetSize;
    photoUrl?: string;
}

export class GetPetsByOwnerUseCase {
    constructor(private petRepository: PetRepository) { }

    async execute(ownerId: string): Promise<Pet[]> {
        return this.petRepository.getByOwner(ownerId);
    }
}

export class CreatePetUseCase {
    constructor(private petRepository: PetRepository) { }

    async execute(params: CreatePetParams): Promise<Pet> {
        const pet = new Pet(
            uuidv4(),
            params.ownerId,
            params.name,
            params.breed,
            params.size,
            params.photoUrl
        );
        await this.petRepository.add(pet);
        return pet;
    }
}

export class UpdatePetUseCase {
    constructor(private petRepository: PetRepository) { }
    async execute(pet: Pet): Promise<Pet> {
        await this.petRepository.modify(pet);
        return pet;
    }
}

export class DeletePetUseCase {
    constructor(private petRepository: PetRepository) { }
    async execute(petId: string): Promise<void> {
        await this.petRepository.delete(petId);
    }
}
