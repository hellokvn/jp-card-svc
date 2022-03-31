import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { FindRequestDto } from './wanikani.dto';
import { Wanikani } from './wanikani.entity';
import { WanikaniService } from './wanikani.service';
import { FindResponse, WANIKANI_SERVICE_NAME } from './pb/wanikani.pb';

@Controller()
export class WanikaniController {
  @Inject(WanikaniService)
  private readonly service: WanikaniService;

  @GrpcMethod(WANIKANI_SERVICE_NAME, 'Find')
  private async find(payload: FindRequestDto): Promise<FindResponse> {
    const data: Wanikani[] = await this.service.find(payload);

    return { error: null, status: HttpStatus.OK, data };
  }
}
