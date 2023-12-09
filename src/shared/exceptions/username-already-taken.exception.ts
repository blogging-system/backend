import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNameAlreadyTakenException extends HttpException {
  constructor(message: string = "The userName might be already taken!") {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
