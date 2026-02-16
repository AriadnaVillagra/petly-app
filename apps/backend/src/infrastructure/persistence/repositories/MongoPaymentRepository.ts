import { PaymentRepository } from "../../../domain/repositories/PaymentRepository";
import { Payment } from "../../../domain/entities/Payment";
import { PaymentModel } from "../models/PaymentModel";

export class MongoPaymentRepository implements PaymentRepository {
    async save(payment: Payment): Promise<void> {
        await PaymentModel.create({
            id: payment.id,
            bookingId: payment.bookingId,
            amount: payment.amount,
            status: payment.status,
            externalReference: payment.externalReference,
            providerPaymentId: payment.providerPaymentId,
        });
    }

    async findByBookingId(bookingId: string): Promise<Payment | null> {
        const doc = await PaymentModel.findOne({ bookingId }).lean();

        if (!doc) return null;

        return new Payment(
            doc.id,
            doc.bookingId,
            doc.amount,
            doc.status,
            doc.externalReference,
            doc.providerPaymentId ?? undefined
        );
    }

    async update(payment: Payment): Promise<void> {
        await PaymentModel.updateOne(
            { id: payment.id },
            {
                status: payment.status,
                providerPaymentId: payment.providerPaymentId,
            }
        );
    }
}
