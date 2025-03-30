import { Module } from '@nestjs/common';
import { ParserService } from './services/parser.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ParserService],
})
export class ExternalSourcesModule {}
