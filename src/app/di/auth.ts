// src/app/di/auth.ts

import { AuthUseCases } from "../../features/auth/application/usecases/AuthUsecases";
import { AuthRepositoryCognito } from "../../features/auth/data/repositories/AuthRepositoryCognito";
import { AuthRepositoryMock } from "../../features/auth/data/repositories/AuthRepositoryMock";
import { ENV } from "../config/env";

const authRepository =
  ENV.AUTH_PROVIDER === 'cognito'
    ? new AuthRepositoryCognito()
    : new AuthRepositoryMock();
    
export const authUseCases = new AuthUseCases(authRepository);
