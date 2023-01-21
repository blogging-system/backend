import validate from "../../../helpers/validate";
import postValidators from "../Validators/post.validators";

import failure from "./../../../helpers/handleFailure";

import {
	getPostBySlug_service,
	getPostById_service,
	getAllPosts_service,
	getRelatedPosts_service,
	getLatestPosts_service,
	getPopularPosts_service,
	getAllPostsByTag_service,
} from "./../services/post.queries.service";
import {
	createPost_service,
	updatePost_service,
	deletePost_service,
	publishPost_service,
} from "./../services/post.mutations.service";

export default {
	Query: {
		getPostBySlug: async (parent, { data }) => {
			try {
				// (1) Validate comming Data
				const validatedData = await validate(
					postValidators.getPostBySlug,
					data
				);

				// (2) Find and return post
				return await getPostBySlug_service(validatedData);
			} catch (error) {
				return failure(error);
			}
		},

		getPostById: async (parent, { data }) => {
			try {
				// (1) Validate comming Data
				const validatedData = await validate(postValidators.getPostById, data);

				// (2) Find and return post
				return await getPostById_service(validatedData);
			} catch (error) {
				return failure(error);
			}
		},

		getAllPosts: async (parent, { data }) => {
			try {
				// (1) Validate comming Data
				const validatedData = await validate(postValidators.getAllPosts, data);

				// (2) Find and return posts
				return await getAllPosts_service(validatedData);
			} catch (error) {
				return failure(error);
			}
		},

		getRelatedPosts: async (parent, { data }) => {
			try {
				// (1) Valiadte comming data
				const validatedData = await validate(
					postValidators.getRelatedPosts,
					data
				);

				// (2) Find and return posts
				return await getRelatedPosts_service(validatedData);
			} catch (error) {
				return failure(error);
			}
		},

		getLatestPosts: async () => {
			try {
				return await getLatestPosts_service();
			} catch (error) {
				return failure(error);
			}
		},

		getPopularPosts: async () => {
			try {
				return await getPopularPosts_service();
			} catch (error) {
				return failure(error);
			}
		},

		getAllPostsByTag: async (parent, { data }) => {
			try {
				// (1) Validate coming data
				const validatedData = await validate(postValidators.getPostByTag, data);

				// (2) Get posts
				return await getAllPostsByTag_service(validatedData);
			} catch (error) {
				return failure(error);
			}
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

		publishPost: async (parent, { data }) => {
			try {
				// (1) Validate comming Data
				const validatedData = await validate(postValidators.publish, data);

				// (2) Publish post and return success message
				return await publishPost_service(validatedData);
			} catch (error) {
				return failure(error);
			}
		},
	},
};
