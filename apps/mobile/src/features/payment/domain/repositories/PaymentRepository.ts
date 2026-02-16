//  src/features/payment/domain/repositories/PaymentRepository.ts

import { PreferenceResponseDTO } from "../../application/dto/PreferenceResponseDTO";

export interface PaymentRepository {
  createPreference(bookingId: string): Promise<PreferenceResponseDTO>;
}
