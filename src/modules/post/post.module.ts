import { Keyword, KeywordSchema } from '../keyword/keyword.schema';
import { Series, SeriesSchema } from '../series/series.schema';
import { KeywordService } from '../keyword/keyword.service';
import { SeriesService } from '../series/series.service';
import { Tag, TagSchema } from '../tag/tag.schema';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './post.schema';
import { TagService } from '../tag/tag.service';
import { PostService } from './post.service';
import { Module } from '@nestjs/common';

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
  providers: [PostService, TagService, KeywordService, SeriesService],
})
export class PostModule {}
