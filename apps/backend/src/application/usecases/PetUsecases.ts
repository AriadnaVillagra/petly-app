//src/application/usecases/PetUsecases.ts
//Defines the business use cases related to Pet entity, orchestrating between controllers and domain services,
// transforming data as needed from DTOs to domain entities and vice versa

import { Pet } from "../../domain/entities/Pet";
import { PetRepository } from "../../domain/repositories/PetRepository";
import { PetDTO } from "../dtos/PetDTO";


/* =========================
   Create Pet
========================= */

export class CreatePetUseCase {
    constructor(private petRepo: PetRepository) { }

    async execute(dto: PetDTO, userId: string): Promise<Pet> {
        const pet = new Pet(
            crypto.randomUUID(),
            userId,
            dto.name,
            dto.breed,
            dto.size,
            dto.photoUrl
        );

        return this.petRepo.save(pet);
    }
}

/* =========================
   Get Pets by Owner
========================= */

export class GetPetsByOwnerUseCase {
    constructor(private petRepo: PetRepository) { }

    async execute(ownerId: string): Promise<Pet[]> {
        return this.petRepo.findByOwner(ownerId);
    }
}

/* =========================
    Update Pet
========================= */

export class UpdatePetUseCase {
    constructor(private petRepo: PetRepository) { }
    async execute(petId: string, dto: PetDTO, userId: string): Promise<Pet> {
        const existingPet = await this.petRepo.findById(petId);
        if (!existingPet) {
            throw new Error("Pet not found");
        }
        if (existingPet.ownerId !== userId) {
            throw new Error("Unauthorized");
        }
        const updatedPet = new Pet(
            existingPet.id,
            existingPet.ownerId,
            dto.name,
            dto.breed,
            dto.size,
            dto.photoUrl
        );
        return this.petRepo.modify(updatedPet);
    }
}

/* =========================
    Delete Pet
========================= */

export class DeletePetUseCase {
    constructor(private petRepo: PetRepository) { }
    async execute(petId: string, userId: string): Promise<void> {
        const existingPet = await this.petRepo.findById(petId);
        if (!existingPet) {
            throw new Error("Pet not found");
        }
        if (existingPet.ownerId !== userId) {
            throw new Error("Unauthorized");
        }
        return this.petRepo.delete(petId);
    }
}

/* =========================
    Get Pet by ID
========================= */

export class GetPetByIdUseCase {
    constructor(private petRepo: PetRepository) { }
    async execute(petId: string): Promise<Pet | null> {
        return this.petRepo.findById
            (petId);
    }
}
