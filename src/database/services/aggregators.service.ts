import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aggregator } from '../entities/aggregator.entity';
import { AGGREGATORS_SEED } from '../seeds/aggregators.seed';

@Injectable()
export class AggregatorsService implements OnModuleInit {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @InjectRepository(Aggregator)
    private readonly repository: Repository<Aggregator>,
  ) {}

  async onModuleInit(): Promise<void> {
    const count = await this.repository.count();
    if (count === 0) {
      await this.repository.save(AGGREGATORS_SEED);
      this.logger.log('Инициализация новостные агрегаторов');
    }
  }
}
