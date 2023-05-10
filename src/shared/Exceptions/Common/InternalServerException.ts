import { Http } from "../../Constants";
import BaseException from "../baseException";

export class InternalServerException extends BaseException {
	constructor(errorMessage) {
		super(
			Http.httpStatusCodes.INTERNAL_SERVER_ERROR,
			Http.httpStatusMessages.INTERNAL_SERVER_ERROR,
			errorMessage || "Sorry, the process went wrong!"
		);
	}
}
