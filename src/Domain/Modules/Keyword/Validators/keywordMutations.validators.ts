import Joi from "joi";
import { CreateKeywordDTO, DeleteKeywordDTO, UpdateKeywordDTO } from "../Types";

export const keywordMutationsValidators = {
	createKeyword: Joi.object<CreateKeywordDTO>({
		name: Joi.string().required(),
	}),

	updateKeyword: Joi.object<UpdateKeywordDTO>({
		_id: Joi.string().hex().length(24).message("Sorry, Invalid _id").required(),
		name: Joi.string().required(),
	}),

	deleteKeyword: Joi.object<DeleteKeywordDTO>({
		_id: Joi.string().hex().length(24).message("Sorry, Invalid _id").required(),
	}),
};
