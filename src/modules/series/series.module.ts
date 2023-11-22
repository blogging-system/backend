import { Series, SeriesSchema } from './series.schema';
import { SeriesController } from './series.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SeriesService } from './series.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Series.name, schema: SeriesSchema }]),
  ],
  controllers: [SeriesController],
  providers: [SeriesService],
})
export class SeriesModule {}
