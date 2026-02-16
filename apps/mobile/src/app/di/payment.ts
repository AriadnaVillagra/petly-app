//  src/app/di/payment.ts

import { PaymentApiRepository } from "../../features/payment/data/repositories/PaymentApiRepository";
import { CreatePreferenceUseCase } from "../../features/payment/application/usecases/PaymentUseCases";

export const paymentRepository = new PaymentApiRepository();

export const paymentUseCases = {
  createPreference: new CreatePreferenceUseCase(paymentRepository),
};
