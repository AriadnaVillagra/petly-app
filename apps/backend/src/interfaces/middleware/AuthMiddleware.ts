//src/interfaces/middleware/AuthMiddleware.ts
//verifies authentication and authorization for incoming requests, before passing them to controllers
// jsonwebtoken  decodes and verifies JWT tokens
// jwks-rsa goes to aws cognito to get the public keys needed to verify the JWT tokens, catches the public key and passes it to jsonwebtoken

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const client = jwksClient({
  jwksUri: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
});

function getKey(header: any, callback: any) {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No token' });

  const token = auth.split(' ')[1];

  jwt.verify(
    token,
    getKey,
    { algorithms: ['RS256'] },
    (err, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      req.auth = {
        sub: decoded.sub,
        email: decoded.email,
        name: decoded.name,
      };

      next();
    }
  );
}
