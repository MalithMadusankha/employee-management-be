import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.APP_ENV !== 'production') {
    app.enableCors({
      allowedHeaders: '*',
      origin: '*',
      credentials: true,
    });
  } else {
    app.enableCors({
      origin: process.env.FE_URL,
      credentials: true,
    });
  }

  app.use(cookieParser());
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
