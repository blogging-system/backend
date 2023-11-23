import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // const { userId } = req.session || {};

    // if (userId) {
    //   const user = await this.userService.findById(userId);

    //   req.currentUser = user;
    // }

    return next();
  }
}
