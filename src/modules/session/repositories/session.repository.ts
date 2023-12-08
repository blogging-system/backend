import { BaseRepository } from "@src/shared/repository";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Session } from "../schemas";
import { Model } from "mongoose";

@Injectable()
export class SessionRepository extends BaseRepository<Session> {
  constructor(@InjectModel(Session.name) sessionModel: Model<Session>) {
    super(sessionModel);
  }
}
