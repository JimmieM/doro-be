import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);
  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  await app.listen(9005);
}
bootstrap();
