import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { knuthShuffle } from 'knuth-shuffle';
import { Repository } from 'typeorm';
import { FindRequestDto } from './wanikani.dto';
import { Wanikani } from './wanikani.entity';
import { Card } from './pb/wanikani.pb';

@Injectable()
export class WanikaniService {
  @InjectRepository(Wanikani)
  private readonly repository: Repository<Wanikani>;

  public async find(payload: FindRequestDto): Promise<Card[]> {
    const cards: Wanikani[] = await this.repository.find({
      select: ['id', 'wanikaniId', 'audio', 'characters', 'readings', 'meanings', 'type'],
      where: payload,
    });

    return this.shuffle(cards);
  }

  public shuffle(wanikanis: Wanikani[]): Card[] {
    const shuffled: Card[] = [];
    wanikanis = knuthShuffle(wanikanis);

    wanikanis.forEach((wanikani: Wanikani) => {
      const isReading: boolean = Math.random() < 0.5;
      const card: Card = {
        isReading,
        characters: wanikani.characters,
        solutions: isReading ? wanikani.readings : wanikani.meanings,
        audio: wanikani.audio,
        wanikaniId: wanikani.wanikaniId,
        type: wanikani.type,
      };

      shuffled.push(card);
      shuffled.push({ ...card, isReading: !isReading, solutions: !isReading ? wanikani.readings : wanikani.meanings });
    });

    return shuffled;
  }
}
