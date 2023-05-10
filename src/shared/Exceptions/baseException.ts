import { GraphQLError } from "graphql";

export default class BaseException extends GraphQLError {
	public statusCode: number;
	public statusMessage: string;

	constructor(statusCode: number, statusMessage: string, errorMessage: string) {
		super(errorMessage, undefined, undefined, undefined, undefined, undefined, {
			statusCode,
			statusMessage,
		});

		this.statusCode = statusCode;
		this.statusMessage = statusMessage;
	}
}
