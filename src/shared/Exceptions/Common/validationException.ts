/**
 * ValidationException class represents an exception that is thrown when a validation process fails.
 * @extends BaseException
 */
import { Http } from "../../Constants";
import BaseException from "../baseException";

export class ValidationException extends BaseException {
	/**
	 * Constructs a new ValidationException instance.
	 * @param {string} errorMessage - The error message for the exception. Default is "Sorry, the validation process failed!".
	 */
	constructor(errorMessage?: string) {
		super(
			Http.httpStatusCodes.UNPROCESSABLE_ENTITY,
			Http.httpStatusMessages.UNPROCESSABLE_ENTITY,
			errorMessage || "Sorry, the validation process failed!"
		);
	}
}
