// src/features/pets/application/mapper/petMapper.ts

import { Pet } from "../../domain/entities/Pet";
import { PetDTO } from "../dto/PetDto";


export class PetMapper {
    static toDTO(pet: Pet): PetDTO {
        return {
            id: pet.id,
            ownerId: pet.ownerId,
            name: pet.name,
            breed: pet.breed,
            size: pet.size,
            photoUrl: pet.photoUrl,
        };
    };
}