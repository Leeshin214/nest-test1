import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // CORS 활성화, CORS 발생을 확인해줌
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
