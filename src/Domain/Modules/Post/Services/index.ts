import { SuggestPostByTitleDTO, GetAllPostsDTO, GetPostByIdDTO, GetPostBySlugDTO, GetAllPostsByTagDTO } from "../Types";
import { CreatePostDTO, DeletePostDTO, PublishPostDTO, UpdatePostDTO } from "../Types/postMutations.dtos";
import PostMutationsServices from "./postMutations.services";
import PostQueriesServices from "./postQueries.services";
export default class PostServices {
	public static async createPost(payload: CreatePostDTO) {
		return await PostMutationsServices.createPost(payload);
	}

	public static async updatePost(payload: UpdatePostDTO) {
		return await PostMutationsServices.updatePost(payload);
	}

	public static async deletePost(payload: DeletePostDTO) {
		return await PostMutationsServices.deletePost(payload);
	}

	public static async publishPost(payload: PublishPostDTO) {
		return await PostMutationsServices.publishPost(payload);
	}

	public static async suggestPostByTitle(data: SuggestPostByTitleDTO) {
		return await PostQueriesServices.suggestPostByTitle(data);
	}

	public static async getPostBySlug(data: GetPostBySlugDTO) {
		return await PostQueriesServices.getPostBySlug(data);
	}

	public static async getPostById(data: GetPostByIdDTO) {
		return await PostQueriesServices.getPostById(data);
	}

	public static async getAllPosts(data: GetAllPostsDTO) {
		return await PostQueriesServices.getAllPosts(data);
	}

	public static async getAllPostsByTag(data: GetAllPostsByTagDTO) {
		return await PostQueriesServices.getAllPostsByTag(data);
	}

	public static async getAllPostsBySeries(data) {
		return await PostQueriesServices.getAllPostsBySeries(data);
	}

	public static async getAllPostsByKeyword(data) {
		return await PostQueriesServices.getAllPostsByKeywords(data);
	}

	public static async getRelatedPosts(data) {
		return await PostQueriesServices.getRelatedPosts(data);
	}

	public static async getLatestPosts(data) {
		return await PostQueriesServices.getLatestPosts(data);
	}

	public static async getPopularPosts(data) {
		return await PostQueriesServices.getPopularPosts(data);
	}

	public static async getPublishedPosts(data) {
		return await PostQueriesServices.getPublishedPosts(data);
	}

	public static async getUnPublishedPosts(data) {
		return await PostQueriesServices.getUnPublishedPosts(data);
	}
}
