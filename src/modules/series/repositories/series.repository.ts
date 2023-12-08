import { BaseRepository } from "@src/shared/repository";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Series } from "../schemas";
import { Model } from "mongoose";

@Injectable()
export class SeriesRepository extends BaseRepository<Series> {
  constructor(@InjectModel(Series.name) seriesModel: Model<Series>) {
    super(seriesModel);
  }
}
