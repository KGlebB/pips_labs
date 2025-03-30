import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aggregator } from './entities/aggregator.entity';
import { Article } from './entities/article.entity';
import { Company } from './entities/company.entity';
import { Prediction } from './entities/prediction.entity';
import { ArticlesService } from './services/articles.service';
import { AggregatorsService } from './services/aggregators.service';
import { CompaniesService } from './services/companies.service';
import { PredictionsService } from './services/predictions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Aggregator, Article, Company, Prediction]),
  ],
  providers: [
    AggregatorsService,
    ArticlesService,
    CompaniesService,
    PredictionsService,
  ],
  exports: [
    AggregatorsService,
    ArticlesService,
    CompaniesService,
    PredictionsService,
  ],
})
export class DatabaseModule {}
