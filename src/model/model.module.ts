import { Module } from '@nestjs/common';
import { DatasetService } from './services/dataset.service';
import { ModelService } from './services/model.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ModelService, DatasetService],
  exports: [ModelService, DatasetService],
})
export class ModelModule {}
