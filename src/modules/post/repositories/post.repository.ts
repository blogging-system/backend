import { BaseRepository } from "@src/shared/repository";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Post } from "../schemas";
import { Model } from "mongoose";

@Injectable()
export class PostRepository extends BaseRepository<Post> {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {
    super(postModel);
  }
}
