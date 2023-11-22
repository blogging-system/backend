import { Post, PostSchema } from './post.schema';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TagService } from '../tag/tag.service';
import { Tag, TagSchema } from '../tag/tag.schema';
import { Keyword, KeywordSchema } from '../keyword/keyword.schema';
import { Series, SeriesSchema } from '../series/series.schema';
import { KeywordService } from '../keyword/keyword.service';
import { SeriesService } from '../series/series.service';

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
