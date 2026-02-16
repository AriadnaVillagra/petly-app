//  src/features/payment/presentation/paymentSlice.ts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { paymentUseCases } from "../../../app/di/payment";


export const createPreferenceThunk = createAsyncThunk(
    "payment/createPreference",
    async (bookingId: string) => {
        return await paymentUseCases.createPreference.execute(bookingId);
    }
);

interface PaymentState {
    loading: boolean;
    initPoint?: string;
    error?: string;
}

const initialState: PaymentState = {
    loading: false,
};

const paymentSlice  = createSlice({
    name: "payment",
    initialState,
    reducers: {
        clearPaymentState: state => {
            state.initPoint = undefined;
            state.error = undefined;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(createPreferenceThunk.pending, state => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(createPreferenceThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.initPoint = action.payload.initPoint;
            })
            .addCase(createPreferenceThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearPaymentState } = paymentSlice.actions;
export const paymentReducer = paymentSlice.reducer;
