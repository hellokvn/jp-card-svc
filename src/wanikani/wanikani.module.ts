import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WanikaniConnect } from './wanikani.connect';
import { WanikaniController } from './wanikani.controller';
import { Wanikani } from './wanikani.entity';
import { WanikaniService } from './wanikani.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wanikani])],
  controllers: [WanikaniController],
  providers: [WanikaniConnect, WanikaniService],
})
export class WanikaniModule {}
