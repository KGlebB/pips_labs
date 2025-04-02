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

  getLastWithExpertScore(): Promise<Article[]> {
    return this.repository.find({
      where: { expertScore: Not(IsNull()) },
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
