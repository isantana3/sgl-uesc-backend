import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurações de CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'Xsrf-Token', 'Access-Control-Allow-Origin'],
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  // Prefixo global para rotas
  const globalPrefix = process.env.URL_PREFIX || 'api';
  app.setGlobalPrefix(globalPrefix);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('SGL-UESC')
    .setDescription('Sistema de Gestão de Laboratórios da UESC (SGL-UESC)')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, document);

  // Middleware de segurança
  app.use(cookieParser());
  app.use(
    csurf({
      cookie: {
        httpOnly: true, // Protege o cookie contra acessos por JavaScript no frontend
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production', // Somente em HTTPS em produção
      },
      value: (req) => req.headers['Xsrf-Token'],
      ignoreMethods: ['GET', 'HEAD', 'OPTIONS'], // Ignora requisições OPTIONS
    })
  );
  // Pipes globais e interceptors
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(3333);
}
bootstrap();
