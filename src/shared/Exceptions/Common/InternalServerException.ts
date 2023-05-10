import { Http } from "../../Constants";
import BaseException from "../baseException";

export class InternalServerException extends BaseException {
	constructor(errorMessage) {
		super(
			Http.httpStatusCodes.FORBIDDEN,
			Http.httpStatusMessages.FORBIDDEN,
			errorMessage || "Sorry, the process went wrong!"
		);
	}
}
