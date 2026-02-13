import {
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { ENV } from '../../app/config/env';

const userPool = new CognitoUserPool({
  UserPoolId: ENV.COGNITO_USER_POOL_ID,
  ClientId: ENV.COGNITO_CLIENT_ID,
});

export async function getAuthToken(): Promise<string | null> {
  const user = userPool.getCurrentUser();
  if (!user) return null;

  return new Promise(resolve => {
    user.getSession(
      (err: Error | null, session: CognitoUserSession | null) => {
        if (err || !session) {
          resolve(null);
          return;
        }
//para obtener el token de acceso, se puede usar session.getAccessToken().getJwtToken() en lugar de session.getIdToken().getJwtToken()
//idToken es para información del usuario, accessToken es para autenticación en APIs protegidas
        resolve(session.getAccessToken().getJwtToken());
      }
    );
  });
}
