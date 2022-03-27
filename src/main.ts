import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: string = config.get<string>('PORT');
  const baseUrl: string = config.get<string>('API_BASE_URL');

  configure(app);

  await app.listen(port, () => {
    console.log('[NOD]', process.version);
    console.log('[ENV]', process.env.NODE_ENV);
    console.log('[PRT]', port);
    console.log('[WEB]', baseUrl);
    console.log('[_DB]', config.get('DATABASE_URL'));
  });
}

export function configure(app: NestExpressApplication): void {
  app.set('trust proxy', 1);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
}

bootstrap();
