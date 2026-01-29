import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDTO } from '../application/dto/UserDTO';
import { UserMapper } from '../application/mapper/UserMapper';
import { authUseCases } from '../../../app/di/auth';

interface AuthState {
  user: UserDTO | null;
  loading: boolean;
  error: string | null;
  requiresConfirmation: boolean;
  emailToConfirm: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  requiresConfirmation: false,
  emailToConfirm: null,
};

/* =========================
   Thunks
========================= */

export const login = createAsyncThunk<
  UserDTO,
  { email: string; password: string },
  { rejectValue: { message: string; requiresConfirmation?: boolean; email?: string } }
>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const user = await authUseCases.login(email, password);
      return UserMapper.toDTO(user);
    } catch (err: any) {
      if (err.message === 'Tenés que confirmar tu cuenta') {
        return rejectWithValue({
          message: err.message,
          requiresConfirmation: true,
          email,
        });
      }

      return rejectWithValue({
        message: err.message ?? 'Error al iniciar sesión',
      });
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await authUseCases.logout();
  }
);

export const register = createAsyncThunk<
  UserDTO,
  { name: string; email: string; password: string }
>('auth/register', async ({ name, email, password }) => {
  const user = await authUseCases.register(name, email, password);
  return UserMapper.toDTO(user);
});

export const confirmAccount = createAsyncThunk<
  void,
  { email: string; code: string }
>('auth/confirmAccount', async ({ email, code }) => {
  await authUseCases.confirmAccount(email, code);
});

export const resendConfirmationCode = createAsyncThunk<
  void,
  { email: string }
>('auth/resendConfirmationCode', async ({ email }) => {
  await authUseCases.resendConfirmationCode(email);
});

export const bootstrapAuth = createAsyncThunk<
  UserDTO | null
>(
  'auth/bootstrap',
  async () => {
    const user = await authUseCases.getCurrentUser();
    if (!user) return null;
    return UserMapper.toDTO(user);
  }
);

/* =========================
   Slice
========================= */

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      // LOGIN
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<UserDTO>) => {
        state.loading = false;
        state.user = action.payload;
        state.requiresConfirmation = false;
        state.emailToConfirm = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? 'Error';
        state.requiresConfirmation = !!action.payload?.requiresConfirmation;
        state.emailToConfirm = action.payload?.email ?? null;
      })

      // REGISTER
      .addCase(register.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<UserDTO>) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error al registrarse';
      })

      // CONFIRM ACCOUNT
      .addCase(confirmAccount.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmAccount.fulfilled, state => {
        state.loading = false;
      })
      .addCase(confirmAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error al confirmar cuenta';
      })

      // RESEND CONFIRMATION CODE
      .addCase(resendConfirmationCode.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendConfirmationCode.fulfilled, state => {
        state.loading = false;
      })
      .addCase(resendConfirmationCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error al reenviar código de confirmación';
      })

      // BOOTSTRAP AUTH
      .addCase(bootstrapAuth.pending, state => {
        state.loading = true;
      })
      .addCase(bootstrapAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(bootstrapAuth.rejected, state => {
        state.loading = false;
        state.user = null;
      })

      // LOGOUT
      .addCase(logout.pending, state => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, state => {
        state.loading = false;
        state.user = null;
        state.error = null;
        state.requiresConfirmation = false;
        state.emailToConfirm = null;
      })
      .addCase(logout.rejected, state => {
        state.loading = false;
      });
  },
});

export const authReducer = authSlice.reducer;
