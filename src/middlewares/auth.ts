import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface RequestPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function auth(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Invalid token');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as RequestPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new Error('Invalid token');
  }
}
