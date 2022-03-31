import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { FindRequest } from './pb/wanikani.pb';
import { WanikaniType } from './wanikani.entity';

export class FindRequestDto implements FindRequest {
  @IsInt()
  @Min(1)
  @Max(60)
  public level: number;

  @IsEnum(WanikaniType)
  @IsOptional()
  public type: WanikaniType;
}
