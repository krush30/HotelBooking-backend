import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Use resolve() to get the absolute path to the root public folder
  const staticPath = resolve(__dirname, '..', '..', 'public'); // Adjust based on your structure
  console.log('Resolved static path:', staticPath); // Should log C:\Users\Asus\Desktop\Hotel booking app\hotel-booking-backend\public

  app.useStaticAssets(staticPath, {
    prefix: '/uploads/', // Consistent prefix with trailing slash
  });
  console.log('Serving static files from:', staticPath);

  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });

  await app.listen(3000);
  console.log('Server running on http://localhost:3000');
}

bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
});
