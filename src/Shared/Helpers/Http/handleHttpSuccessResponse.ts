import { Http } from "../../Constants";
import { ResponseObject } from "./Types/httpResponse.type";

export const handleHttpSuccessResponse = (name: string, message: string): ResponseObject => ({
	success: true,
	name,
	status: Http.httpStatusCodes.OK,
	code: Http.httpStatusMessages.OK,
	message,
});
