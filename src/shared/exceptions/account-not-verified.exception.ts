import { HttpException, HttpStatus } from "@nestjs/common";

export class NotVerifiedException extends HttpException {
  constructor(message: string = "The account needs to be verified first!") {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
