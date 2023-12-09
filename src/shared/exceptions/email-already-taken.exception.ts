import { HttpException, HttpStatus } from "@nestjs/common";

export class EmailAlreadyTakenException extends HttpException {
  constructor(message: string = "The email might be already taken!") {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
