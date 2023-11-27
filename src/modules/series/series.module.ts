import { PublicSeriesController, PrivateSeriesController } from './controllers'
import { Series, SeriesSchema } from './schemas/series.schema'
import { SeriesService } from './services/series.service'
import { SessionModule } from '../session/session.module'
import { Module, forwardRef } from '@nestjs/common'
import { SeriesRepository } from './repositories'
import { MongooseModule } from '@nestjs/mongoose'
import { PostModule } from '../post/post.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Series.name, schema: SeriesSchema }]),
    forwardRef(() => PostModule),
    SessionModule,
  ],
  exports: [SeriesService, SeriesRepository],
  providers: [SeriesService, SeriesRepository],
  controllers: [PublicSeriesController, PrivateSeriesController],
})
export class SeriesModule {}
