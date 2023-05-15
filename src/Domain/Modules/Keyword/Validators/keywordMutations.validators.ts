import Joi from "joi";
import { CreateKeywordDTO } from "../Types";

export const keywordMutationsValidators = {
	createKeyword: Joi.object<CreateKeywordDTO>({
		name: Joi.string().required(),
	}),
};
