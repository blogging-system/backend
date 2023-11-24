import { KeywordModule } from '../keyword/keyword.module'
import { SeriesModule } from '../series/series.module'
import { KeywordService } from '../keyword/services'
import { SeriesService } from '../series/services'
import { MongooseModule } from '@nestjs/mongoose'
import { PostRepository } from './repositories'
import { PostController } from './controllers'
import { TagModule } from '../tag/tag.module'
import { Post, PostSchema } from './schemas'
import { TagService } from '../tag/services'
import { PostService } from './services'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    KeywordModule,
    TagModule,
    SeriesModule,
  ],
  providers: [PostRepository, PostService, TagService, KeywordService, SeriesService],
  controllers: [PostController],
})
export class PostModule {}
