// src/infrastructure/config/pet.composition.ts
// Composition root for Pet module - wiring up use cases with repository and controller - dependency injection

import {
  CreatePetUseCase,
  GetPetsByOwnerUseCase,
  GetPetByIdUseCase,
  UpdatePetUseCase,
  DeletePetUseCase,
} from "../../application/usecases/PetUsecases";

import { PetMemoryRepository } from "../persistence/PetMemoryRepository";
import { PetController } from "../../interfaces/controller/PetController";

const petRepository = new PetMemoryRepository();

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
