import { PublicPostController, PrivatePostCoreController, PrivateAnalyticsPostController } from './controllers'
import { SessionModule } from '../session/session.module'
import { KeywordModule } from '../keyword/keyword.module'
import { SeriesModule } from '../series/series.module'
import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PostRepository } from './repositories'
import { TagModule } from '../tag/tag.module'
import { Post, PostSchema } from './schemas'
import { PostService } from './services'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    forwardRef(() => KeywordModule),
    forwardRef(() => SeriesModule),
    forwardRef(() => TagModule),
    SessionModule,
  ],
  exports: [PostService, PostRepository],
  controllers: [PublicPostController, PrivatePostCoreController, PrivateAnalyticsPostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
