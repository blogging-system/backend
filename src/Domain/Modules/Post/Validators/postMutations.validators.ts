import Joi from "joi";
import { CreatePostDTO, UpdatePostDTO } from "../Types";

export const postMutationsValidators = {
	create: Joi.object<CreatePostDTO>({
		title: Joi.string().length(20).required(),
		description: Joi.string().required(),
		content: Joi.string().required(),
		tags: Joi.array().items(Joi.string().required()),
		keywords: Joi.array().items(Joi.string().required()),
		series: Joi.array().items(Joi.string().required()),
		imageId: Joi.string().hex().length(24).message("Sorry, Invalid _id").required(),
	}),

	update: Joi.object<UpdatePostDTO>({
		_id: Joi.string().hex().length(24).message("Invalid _id").required(),
		payload: Joi.object({
			title: Joi.string().length(5),
			description: Joi.string().length(5),
			content: Joi.string(),
			tags: Joi.array().items(Joi.string()),
			keywords: Joi.array().items(Joi.string()),
			series: Joi.array().items(Joi.string()),
			imageId: Joi.string().hex().length(24).message("Sorry, Invalid _id"),
		}).required(),
	}),

	delete: Joi.object({
		postId: Joi.string().hex().length(24).message("Sorry, Invalid postId"),
	}),

	publish: Joi.object({
		postId: Joi.string().hex().length(24).message("Sorry, Invalid postId"),
	}),
};
