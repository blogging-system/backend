import { PublicSeriesController, PrivateSeriesController } from './controllers'
import { Series, SeriesSchema } from './schemas/series.schema'
import { SeriesService } from './services/series.service'
import { MongooseModule } from '@nestjs/mongoose'
import { SeriesRepository } from './repositories'
import { Module } from '@nestjs/common'

@Module({
  imports: [MongooseModule.forFeature([{ name: Series.name, schema: SeriesSchema }])],
  exports: [SeriesService, SeriesRepository],
  providers: [SeriesService, SeriesRepository],
  controllers: [PublicSeriesController, PrivateSeriesController],
})
export class SeriesModule {}
