import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Article } from '../entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly repository: Repository<Article>,
  ) {}

  create(dto: DeepPartial<Article>): Promise<Article> {
    const created = this.repository.create(dto);
    return this.repository.save(created);
  }

  async update(id: number, dto: DeepPartial<Article>): Promise<Article> {
    const found = await this.repository.findOneByOrFail({ id });
    return this.repository.save({ ...found, ...dto });
  }
}
