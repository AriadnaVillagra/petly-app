// src/features/pets/domain/entities/Pet.ts

import { PetSize } from "../../../../shared/types/PetSizes";

export class Pet {
  constructor(
    public readonly id: string,
    public readonly ownerId: string,
    public readonly name: string,
    public readonly breed: string,
    public readonly size: PetSize,
    public readonly photoUrl?: string,
  ) {}
}
