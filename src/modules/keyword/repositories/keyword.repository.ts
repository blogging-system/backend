import { BaseRepository } from "@src/shared/repository";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Keyword } from "../schemas";
import { Model } from "mongoose";

@Injectable()
export class KeywordRepository extends BaseRepository<Keyword> {
  constructor(@InjectModel(Keyword.name) keywordModel: Model<Keyword>) {
    super(keywordModel);
  }
}
