//  src/features/payment/application/mapper/PaymentMapper.ts

import { PreferenceResponseDTO } from "../dto/PreferenceResponseDTO";

export class PreferenceResponseMapper {
    static toDTO(data: any): PreferenceResponseDTO {
        return {
            initPoint: data.initPoint,
        }
    }
}

export class PaymentMapper { }