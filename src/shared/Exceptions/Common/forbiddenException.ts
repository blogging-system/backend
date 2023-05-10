/**
 * Exception thrown when a user tries to perform an action that is not allowed.
 * @class
 * @extends BaseException
 */
import { Http } from "../../Constants";
import BaseException from "../baseException";

export class ForbiddenException extends BaseException {
	/**
	 * Creates an instance of ForbiddenException.
	 * @param {string} [errorMessage] - The error message to be displayed.
	 */
	constructor(errorMessage?: string) {
		super(
			Http.httpStatusCodes.FORBIDDEN,
			Http.httpStatusMessages.FORBIDDEN,
			errorMessage || "Sorry, you are not allowed to do this!"
		);
	}
}
