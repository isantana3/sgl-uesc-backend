import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(process.env.URL_PREFIX);
  const config = new DocumentBuilder()
    .setTitle('SGL-UESC')
    .setDescription('The SGL-UESC API description')
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
