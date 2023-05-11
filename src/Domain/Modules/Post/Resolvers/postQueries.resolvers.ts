import validateInput from "../../../../shared/Helpers/validateInput";
import PostValidators from "../Validators";

import {
	getPostByTitle_service,
	getPostBySlug_service,
	getPostById_service,
	getAllPosts_service,
	getRelatedPosts_service,
	getLatestPosts_service,
	getPopularPosts_service,
	getAllPostsByTag_service,
	getPublishedPosts_service,
	getUnPublishedPosts_service,
} from "../Services/postQueries.services";

export const postQueries = {
	getPostByTitle: async (parent, { data }) => {
		const validatedData = await validateInput(PostValidators.getPostByTitle, data);

		return await getPostByTitle_service(validatedData);
	},

	getPostBySlug: async (parent, { data }) => {
		const validatedData = await validateInput(PostValidators.getPostBySlug, data);

		return await getPostBySlug_service(validatedData);
	},

	getPostById: async (parent, { data }) => {
		const validatedData = await validateInput(PostValidators.getPostById, data);

		return await getPostById_service(validatedData);
	},

	getAllPosts: async (parent, { data }) => {
		const validatedData = await validateInput(PostValidators.getAllPosts, data);

		return await getAllPosts_service(validatedData);
	},

	getRelatedPosts: async (parent, { data }) => {
		const validatedData = await validateInput(PostValidators.getRelatedPosts, data);

		return await getRelatedPosts_service(validatedData);
	},

	getLatestPosts: async () => {
		return await getLatestPosts_service();
	},

	getPopularPosts: async () => {
		return await getPopularPosts_service();
	},

	getAllPostsByTag: async (parent, { data }) => {
		const validatedData = await validateInput(PostValidators.getPostsByTag, data);

		return await getAllPostsByTag_service(validatedData);
	},

	getPublishedPosts: async (parent, { data }) => {
		const validatedData = await validateInput(PostValidators.getPublishedPosts, data);

		return await getPublishedPosts_service(validatedData);
	},

	getUnPublishedPosts: async (parent, { data }) => {
		const validatedData = await validateInput(PostValidators.getUnPublishedPosts, data);

		return await getUnPublishedPosts_service(validatedData);
	},
};
