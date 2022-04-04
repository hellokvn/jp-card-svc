import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository, getRepository, getConnection } from 'typeorm';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Wanikani, WanikaniType } from './wanikani.entity';

@Injectable()
export class WanikaniConnect implements OnModuleInit {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  private wanikani: AxiosInstance;

  public async onModuleInit(): Promise<void> {
    const token: string = this.config.get('WANIKANI_API_KEY');

    if (!token) {
      throw new Error('No Wanikani API key provided!');
    }

    const baseURL: string = 'https://api.wanikani.com/v2';
    const headers: any = {
      'Content-Type': 'application/json',
      'Wanikani-Revision': 20170710,
      common: { Authorization: `Bearer ${token}` },
    };

    this.wanikani = axios.create({ baseURL, headers });

    await this.importObjects();
  }

  public async importObjects(): Promise<void> {
    const repository: Repository<Wanikani> = getRepository(Wanikani);
    const count: number = await repository.count();

    if (count) {
      return;
    }

    const importRadicals: boolean = false;
    let res: AxiosResponse = await this.wanikani.get('/subjects');
    let perPage: number = 0;

    if (!res || res.status !== 200) {
      return;
    }

    const items: Wanikani[] = [];

    while (res.data.pages.next_url) {
      res = await this.wanikani.get(`/subjects?page_after_id=${perPage}`);

      for (let i = 0; i < res.data.data.length; i++) {
        const data: any = res.data.data[i];

        if (!importRadicals && data.object === WanikaniType.Radical) {
          continue;
        }

        const { auxiliary_meanings } = data.data;
        const item: Wanikani = new Wanikani();

        item.wanikaniId = data.id;
        item.type = <WanikaniType>data.object;
        item.slug = data.data.slug;
        item.characters = data.data.characters;
        item.level = data.data.level;
        item.meanings = data.data.meanings ? data.data.meanings.map((m) => m.meaning) : null;
        item.readings = data.data.readings ? data.data.readings.map((r) => r.reading) : null;

        if (auxiliary_meanings && auxiliary_meanings.length) {
          const meanings: string[] = [];

          auxiliary_meanings.forEach((auxiliary_meaning: any) => {
            if (auxiliary_meaning.type === 'whitelist') {
              meanings.push(auxiliary_meaning.meaning);
            }
          });

          item.meanings = [...item.meanings, ...meanings];
        }

        items.push(item);
      }

      perPage = perPage + 1000;
    }

    console.log(`Imported ${items.length} items.`);

    await getConnection().createQueryBuilder().insert().into(Wanikani).values(items).execute();
  }
}
