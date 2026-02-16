import { BookingRepository } from "../../../domain/repositories/BookingRepository";
import { BookingMemoryRepository } from "../../persistence/repositories/BookingMemoryRepository";
import { MongoBookingRepository } from "../../persistence/repositories/MongoBookingRepository";

export const createBookingRepository = (): BookingRepository => {
  const dbType = process.env.DB_TYPE;

  if (dbType === "mongo") {
    return new MongoBookingRepository();
  }

  return new BookingMemoryRepository();
};
