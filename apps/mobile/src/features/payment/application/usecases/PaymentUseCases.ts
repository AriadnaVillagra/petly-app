import { PaymentRepository } from "../../domain/repositories/PaymentRepository";

export class CreatePreferenceUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(bookingId: string) {
    return await this.paymentRepository.createPreference(bookingId);
  }
}
