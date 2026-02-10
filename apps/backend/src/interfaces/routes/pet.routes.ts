// src/interfaces/routes/pet.routes.ts

import { Router } from "express";
import { petController } from "../../infrastructure/config/pet.composition";
import { authMiddleware } from "../middleware/AuthMiddleware";

const router = Router();

// CREATE
router.post("/pets", authMiddleware, (req, res) => petController.create(req, res));

// GET all pets by owner
router.get("/pets", authMiddleware, (req, res) => petController.getByOwner(req, res));

// GET by id
router.get("/pets/:petId", authMiddleware, (req, res) => petController.getById(req, res));

// UPDATE
router.put("/pets/:petId", authMiddleware, (req, res) => petController.update(req, res));

// DELETE
router.delete("/pets/:petId", authMiddleware, (req, res) => petController.delete(req, res));

export default router;
