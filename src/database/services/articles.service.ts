import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, IsNull, Not, Repository } from 'typeorm';
import { Article } from '../entities/article.entity';
import { PredictionsService } from './predictions.service';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly repository: Repository<Article>,
    private readonly predictionsService: PredictionsService,
  ) {}

  getOne(id: number): Promise<Article> {
    return this.repository.findOneOrFail({
      where: { id },
      relations: { aggregator: true, predictions: { company: true } },
    });
  }

  getMany(page = 0): Promise<Article[]> {
    return this.repository.find({
      select: {
        id: true,
        title: true,
        slug: true,
        prediction: true,
        createdAt: true,
        aggregator: { id: true, slug: true, name: true },
        predictions: {
          id: true,
          company: { id: true, slug: true, name: true },
        },
      },
      relations: { aggregator: true, predictions: { company: true } },
      order: { createdAt: 'DESC' },
      skip: 50 * page,
      take: 50,
    });
  }

  getLastWithExpertScore(): Promise<Article[]> {
    return this.repository.find({
      where: { expertScore: Not(IsNull()) },
      order: { createdAt: 'DESC' },
      take: 250,
    });
  }

  async create(
    dto: DeepPartial<Article>,
    tickers: string[] = [],
  ): Promise<Article> {
    const created = this.repository.create(dto);
    const saved = await this.repository.save(created);
    for (const ticker of tickers) {
      await this.predictionsService.create(saved.id, ticker);
    }
    return saved;
  }

  async update(id: number, dto: DeepPartial<Article>): Promise<Article> {
    const found = await this.repository.findOneByOrFail({ id });
    return this.repository.save({ ...found, ...dto });
  }
}
