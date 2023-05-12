import { CreatePostDTO, DeletePostDTO, PublishPostDTO, UpdatePostDTO } from "../Types/post.dtos";
import PostMutationsServices from "./postMutations.services";

export default class PostServices {
	public static async create(payload: CreatePostDTO) {
		return await PostMutationsServices.create(payload);
	}

	public static async update(payload: UpdatePostDTO) {
		return await PostMutationsServices.update(payload);
	}

	public static async delete(payload: DeletePostDTO) {
		return await PostMutationsServices.delete(payload);
	}

	public static async publish(payload: PublishPostDTO) {
		return await PostMutationsServices.publish(payload);
	}
}
