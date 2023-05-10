import { Http } from "../../Constants";
import BaseException from "../baseException";

export class BadRequestException extends BaseException {
	constructor(errorMessage) {
		super(
			Http.httpStatusCodes.BAD_REQUEST,
			Http.httpStatusMessages.BAD_REQUEST,
			errorMessage || "Sorry, you sent a bad request!"
		);
	}
}
