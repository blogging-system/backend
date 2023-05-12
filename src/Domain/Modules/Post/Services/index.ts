import { CreatePostDTO, DeletePostDTO, PublishPostDTO, UpdatePostDTO } from "../Types/post.dtos";
import PostMutationsServices from "./postMutations.services";

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
}
