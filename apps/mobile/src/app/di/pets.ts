import { ENV } from '../config/env';
import { PetRepositoryMock } from '../../features/pets/data/repositories/PetRepositoryMock';
import { CreatePetUseCase, DeletePetUseCase, GetPetsByOwnerUseCase, UpdatePetUseCase } from '../../features/pets/application/usecases/PetUsecases';
import { PetApiRepository } from '../../features/pets/data/repositories/PetApiRepository';


const petRepository =
  ENV.PETS_PROVIDER === 'mock'
    ? new PetRepositoryMock()
    : new PetApiRepository();

export const petsUseCse = {
  createPet: new CreatePetUseCase(petRepository),
  getPetsByOwner: new GetPetsByOwnerUseCase(petRepository),
  updatePet: new UpdatePetUseCase(petRepository),
  deletePet: new DeletePetUseCase(petRepository),
}