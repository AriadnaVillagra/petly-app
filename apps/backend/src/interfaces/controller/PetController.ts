// src/interfaces/controller/PetController.ts
//recibe http, extrae datos, llama usecases, devuelve http, creates endpoints (apis) for pet-related operations

import { Request, Response } from "express";
import {
    CreatePetUseCase,
    DeletePetUseCase,
    GetPetByIdUseCase,
    GetPetsByOwnerUseCase,
    UpdatePetUseCase
} from "../../application/usecases/PetUsecases";
import { Param } from "../../infrastructure/http/types";

const MOCK_USER_ID = "mock-user-123";

export class PetController {
    constructor(
        private createPet: CreatePetUseCase,
        private getPetsByOwner: GetPetsByOwnerUseCase,
        private getPetById: GetPetByIdUseCase,
        private updatePet: UpdatePetUseCase,
        private deletePet: DeletePetUseCase,
    ) { }

    async create(req: Request, res: Response) {
        try {
            const pet = await this.createPet.execute(req.body, MOCK_USER_ID);
            res.status(201).json(pet);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getByOwner(req: Request, res: Response) {
        try {
            const pets = await this.getPetsByOwner.execute(MOCK_USER_ID);
            res.status(200).json(pets);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getById(req: Request<Param<"petId">>, res: Response) {
        try {
            const petId = req.params.petId;
            const pet = await this.getPetById.execute(petId);
            if (pet) {
                res.status(200).json(pet);
            } else {
                res.status(404).json({ message: "Pet not found" });
            }
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async update(req: Request<Param<"petId">>, res: Response) {
        try {
            const petId = req.params.petId;
            const pet = await this.updatePet.execute(petId, req.body, MOCK_USER_ID);
            res.status(200).json(pet);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async delete(req: Request<Param<"petId">>, res: Response) {
        try {
            const petId = req.params.petId;
            await this.deletePet.execute(petId, MOCK_USER_ID);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

}
