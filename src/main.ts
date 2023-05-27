import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });
  app.setGlobalPrefix(process.env.URL_PREFIX);
  const config = new DocumentBuilder()
    .setTitle('SGL-UESC')
    .setDescription('Sistema de Gestão de laboratórios da uesc (SGL-UESC)')
    .setVersion('1.0')
    .build();
  const optionsSwagger = {
    ignoreGlobalPrefix: false,
  };

  const document = SwaggerModule.createDocument(app, config, optionsSwagger);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3333);
}
bootstrap();
