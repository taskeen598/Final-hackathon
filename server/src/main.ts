import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: "*",
    methods: ['POST','GET', 'DELETE', 'PATCH', 'PUT'],
    allowedHeaders: '*',
    preflightContinue: true
  })
  app.useGlobalPipes(new ValidationPipe());
  const port: number = 3004;
  console.log(`http://localhost:${port}`);
  
  await app.listen(port);
}
bootstrap();
