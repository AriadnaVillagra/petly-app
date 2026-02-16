import { Schema, model } from "mongoose";

/* =========================
   Service Subdocument
========================= */

const ServiceSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    basePrice: { type: Number, required: true },
    type: {
      type: String,
      required: true,
      enum: [
        "BATH",
        "HYGIENIC_CUT",
        "NAIL_TRIM",
        "BATH_AND_CUT",
        "STRIPPING",
      ],
    },
  },
  { _id: false } // importante: evita que Mongo cree _id interno
);

/* =========================
   Booking Schema
========================= */

const BookingSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },

    petId: { type: String, required: true },
    petName: { type: String, required: true },
    petSize: {
      type: String,
      required: true,
      enum: ["SMALL", "MEDIUM", "LARGE"], // ajustalo si tu enum tiene más
    },

    userId: { type: String, required: true },

    service: { type: ServiceSchema, required: true },

    date: { type: String, required: true }, // ISO yyyy-mm-dd
    time: { type: String, required: true }, // HH:mm

    durationMinutes: { type: Number, required: true },

    status: {
      type: String,
      required: true,
      enum: ["PENDING_PAYMENT", "EXPIRED", "PAID", "CANCELLED"], // ajustalo a tu enum real
    },
  },
  {
    timestamps: true, // createdAt, updatedAt (muy útil)
  }
);

export const BookingModel = model("Booking", BookingSchema);
