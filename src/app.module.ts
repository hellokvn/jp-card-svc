import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getEnvPath } from './common/helpers/env.helper';
import { TypeOrmConfigService } from './common/services/typeorm.service';
import { WanikaniModule } from './wanikani/wanikani.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    WanikaniModule,
  ],
})
export class AppModule {}
