import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('my-own Api')
  .setVersion('1.0')
  .addServer('/')
  .addServer('/api')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('private-api-docs', app, document);

await app.listen(4000, () => {
  console.log('server is running...');
});
}
bootstrap();
