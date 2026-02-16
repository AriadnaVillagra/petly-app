// Composition root for Booking module, with factory integration
// src/infrastructure/config/booking.composition.ts

import { BookingController } from "../../../interfaces/controller/BookingController";
import {
  CreateBookingUseCase,
  DeleteBookingUseCase,
  GetBookingByIdUseCase,
  ListBookingsUseCase,
  UpdateBookingStatusUseCase
} from "../../../application/usecases/BookingUsecases";

import { createBookingRepository } from "../repositories/booking.repository.factory";

const bookingRepository = createBookingRepository();

const createBooking = new CreateBookingUseCase(bookingRepository);
const getAllBookings = new ListBookingsUseCase(bookingRepository);
const getBookingById = new GetBookingByIdUseCase(bookingRepository);
const updateBookingStatus = new UpdateBookingStatusUseCase(bookingRepository);
const deleteBooking = new DeleteBookingUseCase(bookingRepository);

export const bookingController = new BookingController(
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
);
