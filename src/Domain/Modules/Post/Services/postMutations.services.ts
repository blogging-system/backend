import { CreatePostDTO, DeletePostDTO, PublishPostDTO, UpdatePostDTO } from "../Types";
import { ForbiddenException, InternalServerException, NotFoundException } from "../../../../Shared/Exceptions";
import Post from "../Model/post.model";

// import { insertTags_service, deleteTags_service } from "../../Tag/Services/tag.mutations.service";
import { GraphQLError } from "graphql";

import PostRepository from "../Repository/post.repository";
import postRepository from "../Repository/post.repository";

export default class PostMutationsServices {
	public static async createPost(data: CreatePostDTO) {
		// TODO
		/** insert if not found
		 *
		 *  1. tags
		 *  2. series
		 *  3. keywords
		 *  4. imageId
		 *
		 */

		const createdPost = await PostRepository.createOne({ ...data });

		if (!createdPost) throw new InternalServerException("the post creation failed!");

		return createdPost;
	}

	public static async updatePost(data: UpdatePostDTO) {
		// TODO
		/** insert if not found
		 *
		 *  1. tags
		 *  2. series
		 *  3. keywords
		 *  4. imageId
		 *
		 */

		const updatedPost = await PostRepository.updateOne({ _id: data._id }, { ...data.payload });

		if (updatedPost.matchedCount === 0) throw new NotFoundException("the post is not found!");
		if (updatedPost.modifiedCount === 0) throw new InternalServerException("the post update process failed!");

		return updatedPost;
	}

	// (3) Delete Post
	public static async deletePost(data: DeletePostDTO) {
		const post = await postRepository.findOne({ _id: data._id });

		if (!post) throw new NotFoundException("the post is not found!");
		/**
		 * TODO:
		 *  use deleteMany on:
		 *  - imageId
		 * 	- tags[]
		 * 	- keywords[]
		 * 	- series[]
		 *  -
		 *
		 **/
		const { deletedCount } = await PostRepository.deleteOne({ _id: data._id });

		if (deletedCount === 0) throw new InternalServerException("The post deletion process failed!");

		return "The post is deleted successfully!";
	}

	public static async publishPost(data: PublishPostDTO) {
		const post = await PostRepository.findOne({ _id: data._id });

		if (!post) throw new NotFoundException("The post is not found!");

		if (post.isPublished) throw new ForbiddenException("The post is already published!");

		const { modifiedCount } = await PostRepository.updateOne(
			{ _id: data._id },
			{ isPublished: true, isPublishedAt: new Date() }
		);

		if (modifiedCount === 0) throw new InternalServerException("The post publication failed!");

		return "The post is published successfully!";
	}


	// addPostToSeries()
	// removePostFromSeries()
}
