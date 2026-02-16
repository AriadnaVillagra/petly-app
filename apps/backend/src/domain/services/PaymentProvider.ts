export interface PaymentProvider {
  createPreference(data: {
    amount: number;
    bookingId: string;
    title: string;
  }): Promise<{ initPoint: string; externalReference: string }>;

  getPaymentStatus(paymentId: string): Promise<{
    status: string;
    externalReference: string;
  }>;
}
