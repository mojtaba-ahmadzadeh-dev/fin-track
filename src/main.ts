import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerConfigInit } from './config/swagger.config';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ConfigService
  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') ?? 3000;
  const env = configService.get<string>('NODE_ENV') ?? 'development';

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Swagger فقط در محیط development
  if (env !== 'production') {
    SwaggerConfigInit(app);
  }

  await app.listen(port);

  console.log(`🚀 Server running on: http://localhost:${port}`);
  console.log(`📄 Swagger: http://localhost:${port}/swagger`);
  console.log(`🌍 Environment: ${env.toUpperCase()}`);
}

bootstrap();