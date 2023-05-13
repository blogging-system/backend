import validateInput from "../../../../Shared/Helpers/validateInput";
import PostValidators from "../Validators";

import PostServices from "../Services";
import {
	SuggestPostByTitleDTO,
	GetAllPostsDTO,
	GetPostByIdDTO,
	GetPostBySlugDTO,
	GetAllPostsByTagDTO,
	GetAllPostsBySeriesDTO,
	GetAllPostsByKeywordDTO,
	GetRelatedPostsDTO,
} from "../Types";

export const postQueries = {
	suggestPostByTitle: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.suggestPostByTitle, args.data as SuggestPostByTitleDTO);

		return await PostServices.suggestPostByTitle(validatedData);
	},

	getPostBySlug: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.getPostBySlug, args.data as GetPostBySlugDTO);

		return await PostServices.getPostBySlug(validatedData);
	},

	getPostById: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.getPostById, args.data as GetPostByIdDTO);

		return await PostServices.getPostById(validatedData);
	},

	getAllPosts: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.getAllPosts, args.data as GetAllPostsDTO);

		return await PostServices.getAllPosts(validatedData);
	},

	getAllPostsByTag: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.getAllPostsByTag, args.data as GetAllPostsByTagDTO);

		return await PostServices.getAllPostsByTag(validatedData);
	},

	getAllPostsBySeries: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.getAllPostsBySeries, args.data as GetAllPostsBySeriesDTO);

		return await PostServices.getAllPostsBySeries(validatedData);
	},

	getAllPostsByKeyword: async (parent, args, context, info) => {
		const validatedData = await validateInput(
			PostValidators.getAllPostsByKeywords,
			args.data as GetAllPostsByKeywordDTO
		);

		return await PostServices.getAllPostsByKeyword(validatedData);
	},

	getRelatedPosts: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.getRelatedPosts, args.data as GetRelatedPostsDTO);

		return await PostServices.getRelatedPosts(validatedData);
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
