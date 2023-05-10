import { Http } from "../../Constants";
import BaseException from "../baseException";

export class UnAuthorizedException extends BaseException {
	constructor(errorMessage) {
		super(
			Http.httpStatusCodes.UNAUTHORIZED,
			Http.httpStatusMessages.UNAUTHORIZED,
			errorMessage || "Sorry, you are not authorized to do this!"
		);
	}
}
