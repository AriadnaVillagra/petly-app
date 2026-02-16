// src/infrastructure/config/pet.composition.ts
// Composition root for Pet module - wiring up use cases with repository and controller - dependency injection

// src/infrastructure/config/compositions/pet.composition.ts

import {
  CreatePetUseCase,
  GetPetsByOwnerUseCase,
  GetPetByIdUseCase,
  UpdatePetUseCase,
  DeletePetUseCase,
} from "../../../application/usecases/PetUsecases";

import { PetController } from "../../../interfaces/controller/PetController";
import { createPetRepository } from "../repositories/pet.repository.factory";

const petRepository = createPetRepository();

const createPet = new CreatePetUseCase(petRepository);
const getPetsByOwner = new GetPetsByOwnerUseCase(petRepository);
const getPetById = new GetPetByIdUseCase(petRepository);
const updatePet = new UpdatePetUseCase(petRepository);
const deletePet = new DeletePetUseCase(petRepository);

export const petController = new PetController(
  createPet,
  getPetsByOwner,
  getPetById,
  updatePet,
  deletePet
);
