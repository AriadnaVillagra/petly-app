//  src/features/payment/domain/entities/Payment.ts

export type PaymentStatus =
    | 'INITIATED'
    | 'APPROVED'
    | 'REJECTED'
    | 'REFUNDED';

export class Payment {
    constructor(
        public readonly id: string,
        public readonly bookingId: string,
        public readonly amount: number,
        public readonly status: PaymentStatus,
        public readonly externalReference: string,
        public readonly providerPaymentId?: string,
    ) { }
}