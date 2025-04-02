import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { HttpController } from './http.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [HttpController],
})
export class HttpHandlerModule {}
