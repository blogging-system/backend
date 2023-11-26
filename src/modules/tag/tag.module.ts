import { PrivateTagController } from './controllers/tag.controller'
import { TagRepository } from './repositories/tag.repository'
import { SessionModule } from '../session/session.module'
import { Tag, TagSchema } from './schemas/tag.schema'
import { TagService } from './services/tag.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'

@Module({
  imports: [MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]), SessionModule],
  providers: [TagService, TagRepository],
  controllers: [PrivateTagController],
  exports: [TagService, TagRepository],
})
export class TagModule {}
