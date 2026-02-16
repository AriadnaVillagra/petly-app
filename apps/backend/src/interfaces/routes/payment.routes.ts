import { Router } from "express";
import { paymentController } from "../../infrastructure/config/compositions/payment.composition";
import { authMiddleware } from "../middleware/AuthMiddleware";


const router = Router();

//post and send the url for doing the checkout on MP

router.post("/payments/create-preference", authMiddleware, (req, res) =>
  paymentController.createPreference(req, res)
);

//webhook for retrieving info abaout the payment with MP

router.post("/payments/webhook", (req, res) =>
  paymentController.webhook(req, res)
);

export default router;
