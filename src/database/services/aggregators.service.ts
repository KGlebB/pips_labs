import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aggregator } from '../entities/aggregator.entity';

@Injectable()
export class AggregatorsService {
  constructor(
    @InjectRepository(Aggregator)
    private readonly repository: Repository<Aggregator>,
  ) {}
}
