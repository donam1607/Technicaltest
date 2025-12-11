import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS cho frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Render sẽ tự set PORT → không hardcode
  const port = process.env.PORT || 3000;

  // Cực kỳ quan trọng: phải listen 0.0.0.0
  await app.listen(port as number, '0.0.0.0');

  console.log(`🚀 Backend is running on http://0.0.0.0:${port}`);
}

bootstrap();
