import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const PORT =process.env.PORT || 3500;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  
  const config = new DocumentBuilder()
  .setTitle('XBOX Live')
  .setDescription('Aplicação para gestão de jogos XBOX')
  .setVersion('1.0.0')
  .addTag('auth')
  .addTag('home')
  .addTag('games')
  .addTag('genres')
  .addTag('profiles')
  .addTag('users')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => {
    //console.log("Server listening on port: ", PORT);
  })  
}
bootstrap();
