/**
 * An object representing a response returned from an API.
 * @typedef {Object} ResponseObject
 * @property {boolean} success - Indicates whether the response was successful or not.
 * @property {string} name - The name of the response operation.
 * @property {number} status - The HTTP status code of the response.
 * @property {string} code - The HTTP status message of the response.
 * @property {string} message - The message returned from the API.
 */
export type ResponseObject = {
	success: boolean;
	name: string;
	status: number;
	code: string;
	message: string;
};
