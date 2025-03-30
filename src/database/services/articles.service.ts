import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entities/article.entity';

@Injectable()
export class ArticlesService {
  public get repository(): Repository<Article> {
    return this._repository;
  }
  constructor(
    @InjectRepository(Article)
    private readonly _repository: Repository<Article>
  ) {}
}
