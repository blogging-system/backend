/**
 * Represents an exception to be thrown when a user is not authorized to perform an action.
 * @extends BaseException
 */
import { Http } from "../../Constants";
import BaseException from "../baseException";

export class UnAuthorizedException extends BaseException {
	/**
	 * Creates an instance of UnAuthorizedException.
	 * @param {string} errorMessage - The error message to be included in the exception. Defaults to "Sorry, you are not authorized to do this!" if not provided.
	 */
	constructor(errorMessage?: string) {
		super(
			Http.httpStatusCodes.UNAUTHORIZED,
			Http.httpStatusMessages.UNAUTHORIZED,
			errorMessage || "Sorry, you are not authorized to do this!",
			"UnAuthorizedError"
		);
	}
}
