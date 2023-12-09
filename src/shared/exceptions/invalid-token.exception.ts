import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidTokenException extends HttpException {
  constructor(message: string = "The token is invalid!") {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
