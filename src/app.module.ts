import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalSourcesModule } from './external-sources/external-sources.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ModelModule } from './model/model.module';
import { HttpHandlerModule } from './http-handler/http-handler.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    DatabaseModule,
    ExternalSourcesModule,
    ModelModule,
    HttpHandlerModule,
  ],
})
export class AppModule {}
