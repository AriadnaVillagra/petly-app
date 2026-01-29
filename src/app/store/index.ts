import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './appSlices';
import { bookingReducer } from '../../features/booking/presentation/bookingSlices';
import { authReducer } from '../../features/auth/presentation/authSlice';
import { dashboardReducer } from '../../features/dashboard/presentation/dashboardSlice';
import { petsReducer } from '../../features/pets/presentation/petSlices';

export const store = configureStore({
  reducer: {
    app: appReducer,
    booking: bookingReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    pets: petsReducer,
  },
});

// Tipos globales (MUY importantes)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
