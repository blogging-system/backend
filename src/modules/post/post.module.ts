import { PublicPostController, PrivatePostController } from './controllers'
import { SessionModule } from '../session/session.module'
import { KeywordModule } from '../keyword/keyword.module'
import { SeriesModule } from '../series/series.module'
import { MongooseModule } from '@nestjs/mongoose'
import { PostRepository } from './repositories'
import { TagModule } from '../tag/tag.module'
import { Post, PostSchema } from './schemas'
import { PostService } from './services'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    KeywordModule,
    SessionModule,
    SeriesModule,
    TagModule,
  ],
  exports: [PostService, PostRepository],
  controllers: [PublicPostController, PrivatePostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
