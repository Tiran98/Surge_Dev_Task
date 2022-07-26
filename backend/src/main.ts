import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { secret } from 'src/utils/constatnt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
  console.log(secret)
}
bootstrap();
