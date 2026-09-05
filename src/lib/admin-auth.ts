import type { IncomingMessage, ServerResponse } from 'http';
import { timingSafeEqual } from 'crypto';

const safeEqual = (a: string, b: string) => {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) {
    return false;
  }
  return timingSafeEqual(aBuf, bBuf);
};

export const isAdminAuthorized = (req: IncomingMessage): boolean => {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    return process.env.NODE_ENV !== 'production';
  }

  const header = req.headers.authorization;
  if (!header?.startsWith('Basic ')) {
    return false;
  }

  const decoded = Buffer.from(header.slice(6), 'base64').toString('utf8');
  const separator = decoded.indexOf(':');
  const providedPassword = separator >= 0 ? decoded.slice(separator + 1) : decoded;

  return safeEqual(providedPassword, password);
};

export const rejectUnauthorized = (res: ServerResponse) => {
  res.statusCode = 401;
  res.setHeader('WWW-Authenticate', 'Basic realm="Admin"');
  res.end('Authentication required');
};
