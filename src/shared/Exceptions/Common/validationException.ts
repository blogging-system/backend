import { Http } from "../../Constants";
import BaseException from "../baseException";

export class ValidationException extends BaseException {
	constructor(errorMessage) {
		super(
			Http.httpStatusCodes.FORBIDDEN,
			Http.httpStatusMessages.FORBIDDEN,
			errorMessage || "Sorry, the validation process failed!"
		);
	}
}
