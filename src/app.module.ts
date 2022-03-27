import { Module } from '@nestjs/common';
import { LevelModule } from './level/level.module';

@Module({
  imports: [LevelModule],
})
export class AppModule {}
