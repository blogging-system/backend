import validateInput from "../../../../Shared/Helpers/validateInput";
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
	suggestPostByTitle: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.getPostByTitle, args.data);

		return await getPostByTitle_service(validatedData);
	},

	getPostBySlug: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.getPostBySlug, args.data);

		return await getPostBySlug_service(validatedData);
	},

	getPostById: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.getPostById, args.data);

		return await getPostById_service(validatedData);
	},

	getAllPosts: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.getAllPosts, args.data);

		return await getAllPosts_service(validatedData);
	},

	getAllPostsByTag: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.getPostsByTag, args.data);

		return await getAllPostsByTag_service(validatedData);
	},

	getAllPostsBySeries: async (parent, args, context, info) => {
		//
	},

	getAllPostsByKeywords: async (parent, args, context, info) => {
		//
	},

	getRelatedPosts: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.getRelatedPosts, args.data);

		return await getRelatedPosts_service(validatedData);
	},

	getLatestPosts: async (parent, args, context, info) => {
		return await getLatestPosts_service();
	},

	getPopularPosts: async (parent, args, context, info) => {
		return await getPopularPosts_service();
	},

	getPublishedPosts: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.getPublishedPosts, args.data);

		return await getPublishedPosts_service(validatedData);
	},

	getUnPublishedPosts: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.getUnPublishedPosts, args.data);

		return await getUnPublishedPosts_service(validatedData);
	},
};
