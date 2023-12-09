import { UserRepository } from "../repositories";
import { HashUtil } from "@src/shared/utils";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dtos";
import { User } from "../schemas";
import { Types, UpdateQuery } from "mongoose";
import { DocumentIdType } from "@src/shared/contracts/types";

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  public async createUser(data: Partial<CreateUserDto>): Promise<User> {
    return await this.userRepo.createOne({ ...data, password: await HashUtil.generateHash(data.password) });
  }

  public async updateUser(userId: DocumentIdType, payload: UpdateQuery<User>): Promise<User> {
    return await this.userRepo.updateOne({ _id: userId }, payload);
  }

  public async findUserByEmail(email: string): Promise<User> {
    return await this.userRepo.findOne({ email });
  }

  public async findUserById(userId: Types.ObjectId): Promise<User> {
    return await this.userRepo.findOne({ _id: userId });
  }

  public async findRootUser(): Promise<User> {
    return await this.userRepo.findOne({});
  }

  public async isUserFound(data: Partial<User>): Promise<boolean> {
    return await this.userRepo.isFound({ ...data });
  }
}
