// Composition root for Booking module
// src/infrastructure/config/booking.composition.ts


import { BookingController } from "../../interfaces/controller/BookingController";
import { CreateBookingUseCase, DeleteBookingUseCase, GetBookingByIdUseCase, ListBookingsUseCase, UpdateBookingStatusUseCase } from "../../application/usecases/BookingUsecases";
import { bookingRepository } from "../persistence";

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
