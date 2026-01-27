// src/features/pets/application/dto/petDto.ts

import { PetSize } from "../../../../shared/types/PetSizes";

export interface PetDTO {
    id: string;
    ownerId: string;
    name: string;
    breed: string;
    size: PetSize;
    photoUrl?: string;

}

