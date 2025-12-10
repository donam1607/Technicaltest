import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS, cho phép frontend truy cập
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001', // URL frontend
    credentials: true, // nếu cần gửi cookie
  });

  // Lấy port từ biến môi trường hoặc default 3000
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Backend is running on http://localhost:${port}`);
}

bootstrap();
