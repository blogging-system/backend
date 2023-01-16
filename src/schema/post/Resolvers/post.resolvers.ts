import validate from "../../../helpers/validate";
import postValidators from "../Validators/post.validators";

import failure from "./../../../helpers/handleFailure";

import {
	getPostBySlug_service,
	getPostById_service,
	getAllPosts_service,
} from "./../services/post.queries.service";
import {
	createPost_service,
	updatePost_service,
	deletePost_service,
} from "./../services/post.mutations.service";
import { valid } from "joi";

export default {
	Query: {
		getPostBySlug: async (parent, { data }) => {
			return await getPostBySlug_service(data);
		},

		getPostById: async (parent, { data }) => {
			return await getPostById_service(data);
		},

		getAllPosts: async () => {
			return await getAllPosts_service();
		},
	},

	Mutation: {
		createPost: async (parent, { data }) => {
			try {
				// (1) Validate comming Data
				const validatedData = await validate(postValidators.create, data);

				// (2) Create Post and then return it
				return await createPost_service(validatedData);
			} catch (error) {
				return failure(error);
			}
		},

		updatePost: async (parent, { data }) => {
			try {
				// (1) Validate comming Data
				const validatedData = await validate(postValidators.update, data);

				// (2) Update Post and then return it
				return await updatePost_service(validatedData);
			} catch (error) {
				return failure(error);
			}
		},

		deletePost: async (parent, { data }) => {
			try {
				// (1) Validate comming Data
				const validatedData = await validate(postValidators.delete, data);

				// (2) Delete post and return message.
				return await deletePost_service(validatedData);
			} catch (error) {
				return failure(error);
			}
		},
	},
};
