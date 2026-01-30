import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookingDTO } from '../application/dto/BookingDTO';
import { BookingMapper } from '../application/mapper/BookingMapper';
import { bookingUseCases } from '../../../app/di/booking';
import { CreateBookingParams } from '../application/usecases/BookingUseCase';


interface BookingState {
  bookings: BookingDTO[];
  loading: boolean;
}

const initialState: BookingState = {
  bookings: [],
  loading: false,
};

export const createBooking = createAsyncThunk<
  BookingDTO,
  CreateBookingParams
>('booking/create', async params => {
  const booking = await bookingUseCases.createBooking.execute(params);
  return BookingMapper.toDTO(booking);
});

export const confirmBooking = createAsyncThunk<
  BookingDTO,
  string
>('booking/confirm', async id => {
  const booking = await bookingUseCases.confirmBooking.execute(id);
  return BookingMapper.toDTO(booking);
});

export const cancelBooking = createAsyncThunk<
  BookingDTO,
  string
>('booking/cancel', async id => {
  const booking = await bookingUseCases.cancelBooking.execute(id);
  return BookingMapper.toDTO(booking);
});

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createBooking.pending, state => {
        state.loading = true;
      })
      .addCase(createBooking.fulfilled, (state, action: PayloadAction<BookingDTO>) => {
        state.loading = false;
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, state => {
        state.loading = false;
      })
      .addCase(confirmBooking.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bookings.findIndex(b => b.id === action.payload.id);
        if (index !== -1) state.bookings[index] = action.payload;
      })
      .addCase(cancelBooking.fulfilled, (state, action: PayloadAction<BookingDTO>) => {
        state.loading = false;
        const index = state.bookings.findIndex(
          booking => booking.id === action.payload.id
        );

        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
      });
  },
});

export const bookingReducer = bookingSlice.reducer;
