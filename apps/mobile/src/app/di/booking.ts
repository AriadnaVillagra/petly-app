// src/app/di/booking.ts

import { ENV } from '../config/env';
import { BookingRepositoryMock } from '../../features/booking/data/repositories/BookingRepositoryMock';
import { CancelBooking, ConfirmBooking, CreateBooking } from '../../features/booking/application/usecases/BookingUseCase';
// futuro:
// import { BookingRepositoryApi } from '../../features/booking/data/repositories/BookingRepositoryApi';

export const bookingRepository = new BookingRepositoryMock();

export const bookingUseCases = {
  createBooking: new CreateBooking(bookingRepository),
  confirmBooking: new ConfirmBooking(bookingRepository),
  cancelBooking: new CancelBooking(bookingRepository),
};
