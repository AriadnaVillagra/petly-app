// PetModel.ts
// src/infrastructure/persistence/models/PetModel.ts

import { Schema, model } from "mongoose";

const PetSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true, 
    },

    ownerId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    breed: {
      type: String,
      required: true,
    },

    size: {
      type: String,
      required: true,
      enum: ["SMALL", "MEDIUM", "LARGE"],
    },

    photoUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const PetModel = model("Pet", PetSchema);
