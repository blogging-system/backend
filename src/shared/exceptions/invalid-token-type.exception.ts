import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidTokenTypeException extends HttpException {
  constructor(message: string = "The given token type is invalid!") {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
