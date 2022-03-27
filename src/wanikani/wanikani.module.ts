import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WanikaniConnect } from './wanikani.connect';
import { Wanikani } from './wanikani.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wanikani])],
  providers: [WanikaniConnect],
})
export class WanikaniModule {}
