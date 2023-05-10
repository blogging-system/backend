import { Http } from "../../Constants";
import BaseException from "../baseException";

export class ValidationException extends BaseException {
	constructor(errorMessage) {
		super(
			Http.httpStatusCodes.UNPROCESSABLE_ENTITY,
			Http.httpStatusMessages.UNPROCESSABLE_ENTITY,
			errorMessage || "Sorry, the validation process failed!"
		);
	}
}
