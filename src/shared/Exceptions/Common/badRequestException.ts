/**
 * Exception class for HTTP 400 Bad Request errors
 *
 * @class BadRequestException
 * @extends BaseException
 */
import { Http } from "../../Constants";
import BaseException from "../baseException";

export class BadRequestException extends BaseException {
	/**
	 * Creates an instance of BadRequestException.
	 *
	 * @param {string} [errorMessage] - The error message to include in the exception. Defaults to "Sorry, you sent a bad request!"
	 * @memberof BadRequestException
	 */
	constructor(errorMessage?: string) {
		super(
			Http.httpStatusCodes.BAD_REQUEST,
			Http.httpStatusMessages.BAD_REQUEST,
			errorMessage || "Sorry, you sent a bad request!",
			"BadRequestError"
		);
	}
}
