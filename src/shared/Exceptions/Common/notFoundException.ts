import { Http } from "../../Constants";
import BaseException from "../baseException";

export class NotFoundException extends BaseException {
	constructor(errorMessage) {
		super(
			Http.httpStatusCodes.NOT_FOUND,
			Http.httpStatusMessages.NOT_FOUND,
			errorMessage || "Sorry, the resource is not found!"
		);
	}
}
