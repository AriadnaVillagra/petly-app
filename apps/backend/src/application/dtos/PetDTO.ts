//src/application/dtos/PetDTO.ts
//Data Transfer Object for Pet entity, defines the structure of pet data exchanged between layers

import { PetSize } from "../../domain/entities/Pet";

export interface PetDTO {
    name: string;
    breed: string;
    size: PetSize;
    photoUrl?: string;
}