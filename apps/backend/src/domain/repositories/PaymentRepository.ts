//  src/domain/repositories/PaymentRepository.ts

import { Payment } from "../entities/Payment";

export interface PaymentRepository {
  save(payment: Payment): Promise<void>;
  findByBookingId(bookingId: string): Promise<Payment | null>;
  update(payment: Payment): Promise<void>;
}
