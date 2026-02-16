import { Request, Response } from "express";
import { CreatePaymentPreference, HandlePaymentWebhook } from "../../application/usecases/PaymentUseCases";

export class PaymentController {
  constructor(
    private createPaymentPreference: CreatePaymentPreference,
    private handlePaymentWebhook: HandlePaymentWebhook
  ) {}

  async createPreference(req: Request, res: Response) {
    try {
      const { bookingId } = req.body;

      if (!bookingId) {
        return res.status(400).json({ message: "bookingId is required" });
      }

      const result = await this.createPaymentPreference.execute(bookingId);

      return res.status(200).json(result);
    } catch (error: any) {
      console.error("Create payment error:", error);
      return res.status(400).json({ message: error.message });
    }
  }

  async webhook(req: Request, res: Response) {
    try {
      /**
       * Mercado Pago manda diferentes estructuras.
       * Lo que nos interesa es el payment id.
       */

      const paymentId =
        req.body?.data?.id ||
        req.query["data.id"];

      if (!paymentId) {
        return res.status(400).json({ message: "Payment id not found" });
      }

      await this.handlePaymentWebhook.execute(paymentId);

      return res.sendStatus(200);
    } catch (error: any) {
      console.error("Webhook error:", error);
      return res.sendStatus(500);
    }
  }
}
