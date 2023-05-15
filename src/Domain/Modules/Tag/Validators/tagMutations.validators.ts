import Joi from "joi";
import { CreateTagDTO, DeleteTagDTO, UpdateTagDTO } from "../Types";

export const tagMutationsValidators = {
	createTag: Joi.object<CreateTagDTO>({
		name: Joi.string().required(),
	}),

	updateTag: Joi.object<UpdateTagDTO>({
		_id: Joi.string().hex().length(24).message("Sorry, Invalid _id").required(),
		name: Joi.string().required(),
	}),

	deleteTag: Joi.object<DeleteTagDTO>({
		_id: Joi.string().hex().length(24).message("Sorry, Invalid _id").required(),
	}),
};
