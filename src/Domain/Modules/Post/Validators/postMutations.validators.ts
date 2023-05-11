import Joi from "joi";
import { CreatePostDTO } from "../Types";

export const postMutationsValidators = {
	create: Joi.object<CreatePostDTO>({
		title: Joi.string().length(20).required(),
		description: Joi.string().required(),
		content: Joi.string().required(),
		tags: Joi.array().items(Joi.string().required()),
		keywords: Joi.array().items(Joi.string().required()),
		imageUrl: Joi.string().uri().required(),
	}),

	update: Joi.object({
		_id: Joi.string().hex().length(24).message("Sorry, Invalid _id"),
		title: Joi.string(),
		description: Joi.string(),
		content: Joi.string(),
		tags: Joi.array().items(Joi.string().required()),
		keywords: Joi.array().items(Joi.string().required()),
		imageUrl: Joi.string().uri(),
	}),

	delete: Joi.object({
		postId: Joi.string().hex().length(24).message("Sorry, Invalid postId"),
	}),

	publish: Joi.object({
		postId: Joi.string().hex().length(24).message("Sorry, Invalid postId"),
	}),
};
