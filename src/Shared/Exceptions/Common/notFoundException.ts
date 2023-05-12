/**
 * A custom exception class to handle not found exceptions. Extends the BaseException class.
 *
 * @class NotFoundException
 * @extends {BaseException}
 */
import { Http } from "../../Constants";
import BaseException from "../baseException";

export class NotFoundException extends BaseException {
	/**
	 * Creates an instance of NotFoundException.
	 * @param {string} [errorMessage] - The error message associated with the exception.
	 * @memberof NotFoundException
	 */
	constructor(errorMessage?: string) {
		super(
			Http.httpStatusCodes.NOT_FOUND,
			Http.httpStatusMessages.NOT_FOUND,
			errorMessage || "the resource is not found!",
			"NotFoundError"
		);
	}
}
