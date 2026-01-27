// presentation/dashboardSlice.ts

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DashboardDto } from '../application/dto/DashboardDto';
import { DashboardMapper } from '../application/mapper/DashboardMapper';
import { RootState } from '../../../app/store';
import { dashboardUseCase } from '../../../app/di/dashboard';

interface DashboardState {
  data: DashboardDto | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchDashboard = createAsyncThunk(
  'dashboard/fetchDashboard',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const bookings = state.booking.bookings;

    const dashboard = await dashboardUseCase.execute(bookings);
    return DashboardMapper.toDto(dashboard);
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearDashboard(state) {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDashboard.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? 'Error loading dashboard';
      });
  },
});

export const dashboardReducer = dashboardSlice.reducer;
export const { clearDashboard } = dashboardSlice.actions;