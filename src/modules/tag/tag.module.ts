import { TagRepository } from './repositories/tag.repository'
import { TagController } from './controllers/tag.controller'
import { Tag, TagSchema } from './schemas/tag.schema'
import { TagService } from './services/tag.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'

@Module({
  imports: [MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }])],
  providers: [TagService, TagRepository],
  controllers: [TagController],
})
export class TagModule {}
