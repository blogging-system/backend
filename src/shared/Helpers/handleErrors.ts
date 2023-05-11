import { Http } from "./../Constants";

export default (error) => {
	if (error.extensions && error.extensions.errorName) {
		const { errorName, statusCode, statusMessage } = error.extensions;
		if (
			["ValidationError", "ForbiddenError", "UnAuthorizedError", "NotFoundError", "BadRequestError"].includes(errorName)
		) {
			return {
				success: false,
				name: errorName,
				status: statusCode,
				code: statusMessage,
				message: error.message.length > 1 ? error.message.split(", ") : error.message,
			};
		}
	}

	if (error.toString().includes("E11000")) {
		return {
			success: false,
			name: "DuplicateError",
			status: Http.httpStatusCodes.CONFLICT,
			code: Http.httpStatusMessages.CONFLICT,
			message: `Sorry, the given data is already taken!`,
		};
	}

	console.log({ error });
	console.log(Object.keys(error));
	console.log(error.message);
	console.log(error.extensions);
	console.log(error.name);

	return {
		success: false,
		name: "InternalServerError",
		status: Http.httpStatusCodes.INTERNAL_SERVER_ERROR,
		code: Http.httpStatusMessages.INTERNAL_SERVER_ERROR,
		message: "Sorry, something went wrong!!",
	};
};
