import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { Request, Response, NextFunction } from 'express';
import { JwtAuthGuard } from './modules/authentications/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    // origin: (origin, callback) => {
    //   // Permitir somente a origem que é necessária
    //   if (origin === 'https://www.uescsgl.site') {
    //     callback(null, true);
    //   } else {
    //     callback(new Error('Not allowed by CORS'));
    //   }
    // },
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Csrf-Token', 'Access-Control-Allow-Origin'],
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  // Prefixo global para rotas
  const globalPrefix = process.env.URL_PREFIX || 'api';
  app.setGlobalPrefix(globalPrefix);

  // // Configuração do Swagger
  // const config = new DocumentBuilder()
  //   .setTitle('SGL-UESC')
  //   .setDescription('Sistema de Gestão de Laboratórios da UESC (SGL-UESC)')
  //   .setVersion('1.0')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup(${globalPrefix}/docs, app, document);

  app.use(cookieParser());

  // Middleware to generate and validate CSRF tokens
  app.use((req: Request, res: Response, next: NextFunction) => {
    const csrfToken = req.cookies['XSRF-TOKEN'];

    // If no token in cookie, generate one and set it in a secure, HTTP-only cookie
    if (!csrfToken) {
      console.log('Generating CSRF token');
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
    // Excluindo a verificação de CSRF para a rota de login
    if (req.path === '/authentications/login') {
      return next(); // Pula a validação de CSRF para o login
    }

    if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
      const csrfTokenHeader = req.headers['X-Csrf-Token'] as string;
      const csrfTokenCookie = req.cookies['XSRF-TOKEN'];

      console.log('CSRF token from header:', csrfTokenHeader);
      console.log('CSRF token from cookie:', csrfTokenCookie);
      // Check if the token from the header matches the token in the cookie
      if (csrfTokenHeader !== csrfTokenCookie) {
        console.log('Invalid CSRF token');
        return res.status(403).json({ message: 'Invalid CSRF token' });
      }
    }
    next();
  });

  // Pipes globais e interceptors
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
   
  // Aplicando JwtAuthGuard globalmente
  //  app.useGlobalGuards(new JwtAuthGuard());
  await app.listen(3333);
}

bootstrap();

// Helper function to generate a CSRF token
function generateCsrfToken(): string {
  return Math.random().toString(36).substring(2); // Simple token generation
}
