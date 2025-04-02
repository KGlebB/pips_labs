import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prediction } from '../entities/prediction.entity';
import { CompaniesService } from './companies.service';

@Injectable()
export class PredictionsService {
  constructor(
    @InjectRepository(Prediction)
    private readonly repository: Repository<Prediction>,
    private readonly companiesService: CompaniesService,
  ) {}

  async create(
    articleId: number,
    companyTicker: string,
  ): Promise<Prediction | null> {
    const company = await this.companiesService.getBySlug(
      companyTicker.toLowerCase(),
    );
    if (!company) return null;
    const article = { id: articleId };
    const created = this.repository.create({ article, company });
    return this.repository.save(created);
  }
}
