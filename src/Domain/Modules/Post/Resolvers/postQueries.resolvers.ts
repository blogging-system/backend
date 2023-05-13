import validateInput from "../../../../Shared/Helpers/validateInput";
import PostValidators from "../Validators";

import PostServices from "../Services";
import { SuggestPostByTitleDTO, getPostByIdDTO, getPostBySlugDTO } from "../Types";

export const postQueries = {
	suggestPostByTitle: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.suggestPostByTitle, args.data as SuggestPostByTitleDTO);

		return await PostServices.suggestPostByTitle(validatedData);
	},

	getPostBySlug: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.getPostBySlug, args.data as getPostBySlugDTO);

		return await PostServices.getPostBySlug(validatedData);
	},

	getPostById: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.getPostById, args.data as getPostByIdDTO);

		return await PostServices.getPostById(validatedData);
	},

	getAllPosts: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.getAllPosts, args.data);

		return await PostServices.getAllPosts(validatedData);
	},

	getAllPostsByTag: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.getPostsByTag, args.data);

		return await PostServices.getAllPostsByTag(validatedData);
	},

	getAllPostsBySeries: async (parent, args, context, info) => {
		return await PostServices.getAllPostsBySeries(args.data);
	},

	getAllPostsByKeyword: async (parent, args, context, info) => {
		return await PostServices.getAllPostsByKeyword(args.data);
	},

	getRelatedPosts: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.getRelatedPosts, args.data);

		return await PostServices.getRelatedPosts(validatedData);
	},

	getLatestPosts: async (parent, args, context, info) => {
		return await PostServices.getLatestPosts(args.data);
	},

	getPopularPosts: async (parent, args, context, info) => {
		return await PostServices.getPopularPosts(args.data);
	},

	getPublishedPosts: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.getPublishedPosts, args.data);

		return await PostServices.getPublishedPosts(validatedData);
	},

	getUnPublishedPosts: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.getUnPublishedPosts, args.data);

		return await PostServices.getUnPublishedPosts(validatedData);
	},
};
