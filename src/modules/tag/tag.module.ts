import { MongooseModule } from '@nestjs/mongoose';
import { TagController } from './tag.controller';
import { Tag, TagSchema } from './tag.schema';
import { TagService } from './tag.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }])],
  providers: [TagService],
  controllers: [TagController],
})
export class TagModule {}
