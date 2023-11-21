import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(firstName: string, lastName: string) {
    return await this.userModel.create({ firstName, lastName });
  }
}
