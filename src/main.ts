import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // Middleware to generate and validate CSRF tokens
  app.use((req: Request, res: Response, next: NextFunction) => {
    const csrfToken = req.cookies['XSRF-TOKEN'];

    // If no token in cookie, generate one and set it in a secure, HTTP-only cookie
    if (!csrfToken) {
      const token = generateCsrfToken(); // function to generate a unique token
      res.cookie('XSRF-TOKEN', token, {
        httpOnly: false,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      });
    }
    next();
  });

  // Middleware to validate CSRF token
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
      const csrfTokenHeader = req.headers['X-Csrf-Token'] as string;
      const csrfTokenCookie = req.cookies['XSRF-TOKEN'];

      // Check if the token from the header matches the token in the cookie
      if (csrfTokenHeader !== csrfTokenCookie) {
        return res.status(403).json({ message: 'Invalid CSRF token' });
      }
    }
    next();
  });

  await app.listen(3333);
}

bootstrap();

// Helper function to generate a CSRF token
function generateCsrfToken(): string {
  return Math.random().toString(36).substring(2); // Simple token generation
}
