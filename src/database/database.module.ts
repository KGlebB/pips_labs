import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aggregator } from './entities/aggregator.entity';
import { Article } from './entities/article.entity';
import { Company } from './entities/company.entity';
import { Prediction } from './entities/prediction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Aggregator, Article, Company, Prediction]),
  ],
})
export class DatabaseModule {}
