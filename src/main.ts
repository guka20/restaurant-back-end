import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Restaurant HTTP Gateway API')
    .setDescription('HTTP Gateway for Restaurant backend services')
    .setVersion('1.0')
    .addTag('Restaurant')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('Restaurant', app, document);

  await app.listen(3000);
}
bootstrap();
