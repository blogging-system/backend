import { GraphQLError } from "graphql";

/**
 * Custom base exception class for handling errors in GraphQL queries/mutations
 * Extends the GraphQLError class from the graphql package
 *
 * @class BaseException
 * @extends GraphQLError
 *
 * @property {number} statusCode - The HTTP status code of the error
 * @property {string} statusMessage - The HTTP status message of the error
 *
 * @param {number} statusCode - The HTTP status code of the error
 * @param {string} statusMessage - The HTTP status message of the error
 * @param {string} errorMessage - The error message
 */
export default class BaseException extends GraphQLError {
	public errorName: string;
	public statusCode: number;
	public statusMessage: string;

	constructor(statusCode: number, statusMessage: string, errorMessage: string, errorName: string) {
		super(errorMessage, undefined, undefined, undefined, undefined, undefined, {
			statusCode,
			statusMessage,
			errorName,
		});

		this.errorName = errorName;
		this.statusCode = statusCode;
		this.statusMessage = statusMessage;
	}
}
