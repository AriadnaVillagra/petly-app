//src/infrastructure/http/MercadoPagoClient.ts
//Implementation of HTTP client for interacting with MercadoPago API

import { MercadoPagoConfig } from "mercadopago";

export const createMercadoPagoClient = () => {
  const accessToken = process.env.MP_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("MP_ACCESS_TOKEN not configured");
  }

  return new MercadoPagoConfig({
    accessToken,
  });
};
