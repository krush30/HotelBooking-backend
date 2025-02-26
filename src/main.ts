import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  console.log(__dirname);
  const staticPath = join(__dirname, '../..', 'public');
  console.log('Serving static files from:', staticPath); // ✅ Debug log

  app.useStaticAssets(staticPath, {
    prefix: '/uploads', // Expose files under "/uploads"
  });
  console.log('Serving static files from:', staticPath); // ✅ Debug log

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
