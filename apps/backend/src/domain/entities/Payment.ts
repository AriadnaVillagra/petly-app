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

  approve(providerPaymentId: string): Payment {
    return new Payment(
      this.id,
      this.bookingId,
      this.amount,
      "APPROVED",
      this.externalReference,
      providerPaymentId
    );
  }

  reject(providerPaymentId: string): Payment {
    return new Payment(
      this.id,
      this.bookingId,
      this.amount,
      "REJECTED",
      this.externalReference,
      providerPaymentId
    );
  }

  refund(providerPaymentId: string): Payment {
    return new Payment(
      this.id,
      this.bookingId,
      this.amount,
      "REFUNDED",
      this.externalReference,
      providerPaymentId
    );
  }

}
