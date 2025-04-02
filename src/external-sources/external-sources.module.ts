import { Module } from '@nestjs/common';
import { ParserService } from './services/parser.service';
import { DatabaseModule } from 'src/database/database.module';
import { ModelModule } from 'src/model/model.module';

@Module({
  imports: [DatabaseModule, ModelModule],
  providers: [ParserService],
})
export class ExternalSourcesModule {}
