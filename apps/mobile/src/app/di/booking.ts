// src/app/di/booking.ts

import { CancelBooking, ConfirmBooking, CreateBooking } from '../../features/booking/application/usecases/BookingUseCase';
import { BookingApiRepository } from '../../features/booking/data/repositories/BookingApiRepository';
import { BookingRepositoryMock } from '../../features/booking/data/repositories/BookingRepositoryMock';
import { ENV } from '../config/env';

export const bookingRepository =
  ENV.BOOKING_PROVIDER === 'mock'
    ? new BookingRepositoryMock()
    : new BookingApiRepository();

export const bookingUseCases = {
  createBooking: new CreateBooking(bookingRepository),
  confirmBooking: new ConfirmBooking(bookingRepository),
  cancelBooking: new CancelBooking(bookingRepository),
};
