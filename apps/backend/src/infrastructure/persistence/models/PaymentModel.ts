import { model, Schema } from "mongoose";

const PaymentSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    bookingId: { type: String, required: true },

    amount: { type: Number, required: true },

    status: {
      type: String,
      required: true,
      enum: ["INITIATED", "APPROVED", "REJECTED", "REFUNDED"],
    },

    externalReference: { type: String, required: true },

    providerPaymentId: { type: String },
  },
  { timestamps: true }
);

export const PaymentModel = model("Payment", PaymentSchema);
