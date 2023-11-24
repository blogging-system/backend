import { SeriesController } from './controllers/series.controller'
import { Series, SeriesSchema } from './schemas/series.schema'
import { SeriesService } from './services/series.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'
import { SeriesRepository } from './repositories'

@Module({
  imports: [MongooseModule.forFeature([{ name: Series.name, schema: SeriesSchema }])],
  providers: [SeriesService, SeriesRepository],
  controllers: [SeriesController],
  exports: [SeriesService, SeriesRepository],
})
export class SeriesModule {}
