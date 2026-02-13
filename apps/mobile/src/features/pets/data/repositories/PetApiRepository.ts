import { PetDTO } from "../../application/dto/PetDto";
import { PetMapper } from "../../application/mapper/petMapper";
import { Pet } from "../../domain/entities/Pet";
import { PetRepository } from "../../domain/repositories/PetRepository";
import { PetApiClient } from "../http/PetApiClient";


export class PetApiRepository implements PetRepository {

    async add(pet: Pet): Promise<Pet> {
        const dto = PetMapper.toDTO(pet);
        const { data } = await PetApiClient.post<PetDTO>('/pets', dto);
        return PetMapper.toDomain(data);
    }
    async modify(pet: Pet): Promise<Pet> {
        const dto = PetMapper.toDTO(pet);
        const { data } = await PetApiClient.put<PetDTO>(`/pets/${pet.id}`, dto);
        return PetMapper.toDomain(data);
    }
    async delete(petId: string): Promise<void> {
        await PetApiClient.delete(`/pets/${petId}`);
    }
    async getByOwner(): Promise<Pet[]> {
        const { data } = await PetApiClient.get<PetDTO[]>(`/pets`);
        return data.map(PetMapper.toDomain);
    }

}