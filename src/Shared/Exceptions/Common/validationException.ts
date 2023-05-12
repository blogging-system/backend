/**
 * ValidationException class represents an exception that is thrown when a validation process fails.
 * @extends BaseException
 */
import { Http } from "../../Constants";
import BaseException from "../baseException";

export class ValidationException extends BaseException {
	/**
	 * Constructs a new ValidationException instance.
	 * @param {string | string[]} errorMessage - The error message or array of error messages for the exception. Default is "Sorry, the validation process failed!".
	 */

	constructor(errorMessage?: string | string[]) {
		const message = Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage;

		super(
			Http.httpStatusCodes.UNPROCESSABLE_ENTITY,
			Http.httpStatusMessages.UNPROCESSABLE_ENTITY,
			message || "the validation process failed!",
			"ValidationError"
		);
	}
}
