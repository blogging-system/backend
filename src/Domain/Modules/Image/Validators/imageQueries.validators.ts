import Joi from "joi";
import { GetImageByIdDTO } from "../Types";

export const imageQueriesValidators = {
	getImageById: Joi.object<GetImageByIdDTO>({
		_id: Joi.string().required(),
	}),
};
