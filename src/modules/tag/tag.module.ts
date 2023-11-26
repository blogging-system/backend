import { PrivateTagController } from './controllers/private-tag.controller'
import { TagRepository } from './repositories/tag.repository'
import { SessionModule } from '../session/session.module'
import { Tag, TagSchema } from './schemas/tag.schema'
import { TagService } from './services/tag.service'
import { PublicTagController } from './controllers'
import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'

@Module({
  imports: [MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]), SessionModule],
  controllers: [PublicTagController, PrivateTagController],
  providers: [TagService, TagRepository],
  exports: [TagService, TagRepository],
})
export class TagModule {}
