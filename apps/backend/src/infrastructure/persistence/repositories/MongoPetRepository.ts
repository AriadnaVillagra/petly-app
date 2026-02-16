// MongoPetRepository.ts

import { PetRepository } from "../../../domain/repositories/PetRepository";
import { Pet } from "../../../domain/entities/Pet";
import { PetModel } from "../models/PetModel";

export class MongoPetRepository implements PetRepository {

  async save(pet: Pet): Promise<Pet> {
    await PetModel.create({
      id: pet.id,
      name: pet.name,
      breed: pet.breed,
      size: pet.size,
      photoUrl: pet.photoUrl,
      ownerId: pet.ownerId,
    });

    return pet;
  }

  async findById(id: string): Promise<Pet | null> {
    const doc = await PetModel.findOne({ id });

    if (!doc) return null;

    return new Pet(
      doc.id,
      doc.ownerId,
      doc.name,
      doc.breed,
      doc.size as any,
      doc.photoUrl ?? undefined
    );
  }

  async findByOwner(ownerId: string): Promise<Pet[]> {
    const docs = await PetModel.find({ ownerId });

    return docs.map(doc =>
      new Pet(
        doc.id,
        doc.ownerId,
        doc.name,
        doc.breed,
        doc.size as any,
        doc.photoUrl ?? undefined
      )
    );
  }

  async modify(pet: Pet): Promise<Pet> {
    await PetModel.updateOne(
      { id: pet.id },
      {
        ownerId: pet.ownerId,
        name: pet.name,
        breed: pet.breed,
        size: pet.size,
        photoUrl: pet.photoUrl,
      }
    );
    return pet;
  }

  async delete(id: string): Promise<void> {
    await PetModel.deleteOne({ id });
  }
}
