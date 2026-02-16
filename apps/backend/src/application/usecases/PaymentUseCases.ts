import crypto from "crypto";
import { BookingRepository } from "../../domain/repositories/BookingRepository";
import { PaymentRepository } from "../../domain/repositories/PaymentRepository";
import { PaymentProvider } from "../../domain/services/PaymentProvider";
import { Payment } from "../../domain/entities/Payment";

export class CreatePaymentPreference {
    constructor(
        private bookingRepo: BookingRepository,
        private paymentRepo: PaymentRepository,
        private paymentProvider: PaymentProvider
    ) { }

    async execute(bookingId: string): Promise<{ initPoint: string }> {
        // 1️⃣ Buscar booking
        const booking = await this.bookingRepo.getById(bookingId);

        if (booking.status !== "PENDING_PAYMENT") {
            throw new Error("Booking is not pending payment");
        }

        // 2️⃣ Crear preferencia en Mercado Pago
        const { initPoint, externalReference } =
            await this.paymentProvider.createPreference({
                bookingId,
                amount: booking.service.basePrice,
                title: `Grooming service - ${booking.petName}`,
            });

        // 3️⃣ Crear entidad Payment
        const payment = new Payment(
            crypto.randomUUID(),
            bookingId,
            booking.service.basePrice,
            "INITIATED",
            externalReference
        );

        // 4️⃣ Guardar payment
        await this.paymentRepo.save(payment);

        return { initPoint };
    }
}


export class HandlePaymentWebhook {
    constructor(
        private bookingRepo: BookingRepository,
        private paymentRepo: PaymentRepository,
        private paymentProvider: PaymentProvider
    ) { }

    async execute(paymentId: string): Promise<void> {
        const { status, externalReference } =
            await this.paymentProvider.getPaymentStatus(paymentId);

        const existingPayment =
            await this.paymentRepo.findByBookingId(externalReference);

        if (!existingPayment) {
            throw new Error("Payment not found in system");
        }

        let updatedPayment: Payment | null = null;

        switch (status) {
            case "approved":
                updatedPayment = existingPayment.approve(paymentId);
                break;

            case "rejected":
                updatedPayment = existingPayment.reject(paymentId);
                break;

            case "refunded":
                updatedPayment = existingPayment.refund(paymentId);
                break;

            default:
                return; // pending u otros → no hacemos nada
        }

        await this.paymentRepo.update(updatedPayment);

        if (updatedPayment.status === "APPROVED") {
            const booking = await this.bookingRepo.getById(
                existingPayment.bookingId
            );

            const updatedBooking = booking.markAsPaid();

            await this.bookingRepo.update(updatedBooking);
        }
    }
}
