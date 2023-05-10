import { Http } from "../../Constants";
import BaseException from "../baseException";

export class ForbiddenException extends BaseException {
	constructor(errorMessage) {
		super(
			Http.httpStatusCodes.FORBIDDEN,
			Http.httpStatusMessages.FORBIDDEN,
			errorMessage || "Sorry, you are not allowed to do this!"
		);
	}
}
