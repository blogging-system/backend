import Joi from "joi";
import { CreateKeywordDTO, UpdateKeywordDTO } from "../Types";

export const keywordMutationsValidators = {
	createKeyword: Joi.object<CreateKeywordDTO>({
		name: Joi.string().required(),
	}),

	updateKeyword: Joi.object<UpdateKeywordDTO>({
		_id: Joi.string().hex().length(24).message("Sorry, Invalid _id").required(),
		name: Joi.string().required(),
	}),
};
