import { CreatePostDTO, DeletePostDTO, UpdatePostDTO } from "../Types/post.dtos";
import PostMutationsServices from "./postMutations.services";

export default class PostServices {
	public static async create(payload: CreatePostDTO) {
		return await PostMutationsServices.create(payload);
	}

	public static async update(payload: UpdatePostDTO) {
		return await PostMutationsServices.update(payload);
	}

	public static async delete(postId: DeletePostDTO) {
		return await PostMutationsServices.delete(postId);
	}

	public static async publish(postId) {
		return await PostMutationsServices.publish(postId);
	}
}
