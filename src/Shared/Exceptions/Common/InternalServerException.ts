/**
 * Custom exception for Internal Server Error.
 * @extends BaseException
 */
import { Http } from "../../Constants";
import BaseException from "../baseException";

export class InternalServerException extends BaseException {
	/**
	 * Creates an instance of InternalServerException.
	 * @param {string} errorMessage - The error message.
	 */
	constructor(errorMessage) {
		super(
			Http.httpStatusCodes.INTERNAL_SERVER_ERROR,
			Http.httpStatusMessages.INTERNAL_SERVER_ERROR,
			errorMessage || "the process went wrong!",
			"InternalServerError"
		);
	}
}
