// data/repositories/AuthRepositoryCognito.ts

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';

import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { User } from '../../domain/entities/User';
import { ENV } from '../../../../app/config/env';

const userPool = new CognitoUserPool({
  UserPoolId: ENV.COGNITO_USER_POOL_ID,
  ClientId: ENV.COGNITO_CLIENT_ID,
});

export class AuthRepositoryCognito implements AuthRepository {

  async resendConfirmationCode(email: string): Promise<void> {
    console.log('🔐 Repo → resendConfirmationCode email:', email);
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.resendConfirmationCode((err) => {
        if (err) {
          console.error('❌ Repo → Cognito resend error:', err);
          reject(err);
          return;
        }
        console.log('✅ Repo → Cognito resend OK');
        resolve();
      });
    });
  }

  async confirmAccount(email: string, code: string): Promise<void> {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, err => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }

  async login(email: string, password: string): Promise<User> {

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authDetails, {
        onSuccess: session => {
          console.log('ID TOKEN:', session.getIdToken().getJwtToken());
          console.log('ACCESS TOKEN:', session.getAccessToken().getJwtToken());
          const idTokenPayload = session.getIdToken().payload;
          const jwt = session.getAccessToken().getJwtToken();

          resolve(
            new User(
              idTokenPayload.sub,
              idTokenPayload.name ?? 'Usuario',
              idTokenPayload.email,
              undefined,
              jwt
            )
          );
        },
        onFailure: err => {
          if (err.code === 'UserNotConfirmedException') {
            reject(new Error('Tenés que confirmar tu cuenta'));
            return;
          }

          reject(new Error(err.message ?? 'Error al iniciar sesión'));
        },
      });
    });
  }

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const attributes = [
      new CognitoUserAttribute({ Name: 'name', Value: name }),
      new CognitoUserAttribute({ Name: 'email', Value: email }),
    ];

    return new Promise((resolve, reject) => {
      userPool.signUp(
        email,
        password,
        attributes,
        [],
        (err, result) => {
          console.log('🧪 Cognito signUp result:', result);
          console.log('❌ Cognito signUp error:', err);
          if (err || !result) {
            reject(err);
            return;
          }

          resolve(
            new User(
              result.userSub,
              name,
              email
            )
          );
        }
      );
    });
  }


  async logout(): Promise<void> {
    const user = userPool.getCurrentUser();
    user?.signOut();
  }

  async getCurrentUser(): Promise<User | null> {
    const cognitoUser = userPool.getCurrentUser();
    if (!cognitoUser) return null;

    return new Promise(resolve => {
      cognitoUser.getSession(
        (err: Error | null, session: CognitoUserSession | null) => {
          if (err || !session) {
            resolve(null);
            return;
          }

          const payload = session.getIdToken().payload;

          resolve(
            new User(
              payload.sub,
              payload.name ?? 'Usuario',
              payload.email
            )
          );
        });
    });
  }

  async forgotPassword(email: string): Promise<void> {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.forgotPassword({
        onSuccess: () => {
          resolve();
        },
        onFailure: err => {
          reject(err);
        },
      });
    });
  }

  async confirmForgotPassword(
    email: string,
    code: string,
    newPassword: string
  ): Promise<void> {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.confirmPassword(code, newPassword, {
        onSuccess: () => {
          resolve();
        },
        onFailure: err => {
          reject(err);
        },
      });
    });
  }
}
