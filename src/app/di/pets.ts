import { ENV } from '../config/env';
import { PetRepositoryMock } from '../../features/pets/data/repositories/PetRepositoryMock';
import { CreatePetUseCase, DeletePetUseCase, GetPetsByOwnerUseCase, UpdatePetUseCase } from '../../features/pets/application/usecases/PetUsecases';
// futuro:
// import { PetRepositoryApi } from '../../features/pets/data/repositories/PetRepositoryApi';



const petRepository =
  ENV.PETS_PROVIDER === 'mock'
    ? new PetRepositoryMock()
    : new PetRepositoryMock(); // temporal

export const getPetsByOwnerUseCase = new GetPetsByOwnerUseCase(petRepository);
export const createPetUseCase = new CreatePetUseCase(petRepository);
export const updatePetUseCase = new UpdatePetUseCase(petRepository);
export const deletePetUseCase = new DeletePetUseCase(petRepository);
