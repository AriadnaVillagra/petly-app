//  src/features/payment/data/repositories/PaymentApiRepository.ts


import { PreferenceResponseMapper } from "../../application/mapper/PaymentMapper";
import { PaymentRepository } from "../../domain/repositories/PaymentRepository";
import { PaymentApiClient } from "../http/PaymentApiClient";
import { PreferenceResponseDTO } from "../../application/dto/PreferenceResponseDTO";

export class PaymentApiRepository implements PaymentRepository {
  async createPreference(bookingId: string): Promise<PreferenceResponseDTO> {
    const response = await PaymentApiClient.post(
      "/payments/create-preference",
      { bookingId }
    );

    return PreferenceResponseMapper.toDTO(response.data);
  }
}
