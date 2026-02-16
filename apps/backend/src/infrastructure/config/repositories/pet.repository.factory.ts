import { PetRepository } from "../../../domain/repositories/PetRepository";
import { MongoPetRepository } from "../../persistence/repositories/MongoPetRepository";
import { PetMemoryRepository } from "../../persistence/repositories/PetMemoryRepository";


export const createPetRepository = (): PetRepository => {
  const dbType = process.env.DB_TYPE;

  if (dbType === "mongo") {
    return new MongoPetRepository();
  }

  return new PetMemoryRepository();
};
