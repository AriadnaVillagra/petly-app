// src/interfaces/routes/pet.routes.ts

import { Router } from "express";
import { petController } from "../../infrastructure/config/pet.composition";

const router = Router();

// CREATE
router.post("/pets", (req, res) => petController.create(req, res));

// GET all pets by owner (mock user)
router.get("/pets", (req, res) => petController.getByOwner(req, res));

// GET by id
router.get("/pets/:petId", (req, res) => petController.getById(req, res));

// UPDATE
router.put("/pets/:petId", (req, res) => petController.update(req, res));

// DELETE
router.delete("/pets/:petId", (req, res) => petController.delete(req, res));

export default router;
