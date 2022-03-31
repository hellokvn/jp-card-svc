import { Injectable } from '@nestjs/common';
import { Wanikani } from './wanikani.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindRequestDto } from './wanikani.dto';

@Injectable()
export class WanikaniService {
  @InjectRepository(Wanikani)
  private readonly repository: Repository<Wanikani>;

  public find(payload: FindRequestDto): Promise<Wanikani[]> {
    return this.repository.find({
      select: ['id', 'wanikaniId', 'audio', 'characters', 'readings', 'meanings', 'type'],
      where: payload,
    });
  }
}
