import PostMutationsServices from "./postMutations.services";

export default class PostServices {
	public static async create(payload) {
		return await PostMutationsServices.create(payload);
	}

	public static async update(payload) {
		return await PostMutationsServices.update(payload);
	}

	public static async delete(postId) {
		return await PostMutationsServices.delete(postId);
	}

	public static async publish(postId) {
		return await PostMutationsServices.publish(postId);
	}
}
