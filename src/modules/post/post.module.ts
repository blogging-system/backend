import { Keyword, KeywordSchema } from '../keyword/keyword.schema'
import { Series, SeriesSchema } from '../series/series.schema'
import { KeywordService } from '../keyword/keyword.service'
import { SeriesService } from '../series/series.service'
import { Tag, TagSchema } from '../tag/schemas/tag.schema'
import { PostController } from './post.controller'
import { PostRepository } from './post.repository'
import { MongooseModule } from '@nestjs/mongoose'
import { Post, PostSchema } from './post.schema'
import { TagService } from '../tag/services/tag.service'
import { PostService } from './post.service'
import { Module } from '@nestjs/common'
import { TagRepository } from '../tag/repositories/tag.repository'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Tag.name, schema: TagSchema },
      { name: Keyword.name, schema: KeywordSchema },
      { name: Series.name, schema: SeriesSchema },
    ]),
  ],
  controllers: [PostController],
  providers: [PostRepository, PostService, TagService, TagRepository, KeywordService, SeriesService],
})
export class PostModule {}
