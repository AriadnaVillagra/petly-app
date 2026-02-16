//  src/infrastructure/http/MercadoPagoPaymentProvider.ts

import { Preference, Payment as MercadoPagoPayment } from "mercadopago";
import { PaymentProvider } from "../../domain/services/PaymentProvider";
import { createMercadoPagoClient } from "./MercadoPagoClient";

export class MercadoPagoPaymentProvider implements PaymentProvider {
    private client = createMercadoPagoClient();

    async createPreference(params: {
        bookingId: string;
        amount: number;
        title: string;
    }) {
        const preference = new Preference(this.client);

        const result = await preference.create({
            body: {
                items: [
                    {
                        id: `booking-${params.bookingId}`,
                        title: params.title,
                        quantity: 1,
                        unit_price: params.amount,
                    },
                ],
                external_reference: params.bookingId,
            },
        });

        return {
            initPoint: result.init_point!,
            externalReference: params.bookingId,
        };
    }

    async getPaymentStatus(paymentId: string) {
        const payment = new MercadoPagoPayment(this.client);

        const result = await payment.get({ id: paymentId });

        return {
            status: result.status!,
            externalReference: result.external_reference!,
        };
    }
}
