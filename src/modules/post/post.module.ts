import { KeywordModule } from '../keyword/keyword.module'
import { SeriesModule } from '../series/series.module'
import { KeywordService } from '../keyword/services'
import { SeriesService } from '../series/services'
import { PostController } from './post.controller'
import { PostRepository } from './post.repository'
import { MongooseModule } from '@nestjs/mongoose'
import { Post, PostSchema } from './post.schema'
import { TagModule } from '../tag/tag.module'
import { PostService } from './post.service'
import { TagService } from '../tag/services'
import { Module } from '@nestjs/common'

@Module({
  imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]), KeywordModule, TagModule, SeriesModule],
  providers: [PostRepository, PostService, TagService, KeywordService, SeriesService],
  controllers: [PostController],
})
export class PostModule {}
