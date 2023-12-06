import { BaseRepository } from '@src/shared/repository'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { Tag } from '../schemas'

@Injectable()
export class TagRepository extends BaseRepository<Tag> {
  constructor(@InjectModel(Tag.name) tagModel: Model<Tag>) {
    super(tagModel)
  }
}
