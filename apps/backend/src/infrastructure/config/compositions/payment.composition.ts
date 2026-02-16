

/**
 * Factory / Composition Root for Payment module
 */

import { CreatePaymentPreference, HandlePaymentWebhook } from "../../../application/usecases/PaymentUseCases";
import { BookingRepository } from "../../../domain/repositories/BookingRepository";
import { PaymentRepository } from "../../../domain/repositories/PaymentRepository";
import { PaymentController } from "../../../interfaces/controller/PaymentController";
import { MercadoPagoPaymentProvider } from "../../http/MercadoPagoPaymentProvider";
import { MongoBookingRepository } from "../../persistence/repositories/MongoBookingRepository";
import { MongoPaymentRepository } from "../../persistence/repositories/MongoPaymentRepository";

// Repositories
const bookingRepository: BookingRepository = new MongoBookingRepository();
const paymentRepository: PaymentRepository = new MongoPaymentRepository();

// Provider
const paymentProvider = new MercadoPagoPaymentProvider();

// UseCases
const createPaymentPreference = new CreatePaymentPreference(
  bookingRepository,
  paymentRepository,
  paymentProvider
);

const handlePaymentWebhook = new HandlePaymentWebhook(
  bookingRepository,
  paymentRepository,
  paymentProvider
);

// Controller
export const paymentController = new PaymentController(
  createPaymentPreference,
  handlePaymentWebhook
);
