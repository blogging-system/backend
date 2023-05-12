import { CreatePostDTO, DeletePostDTO, UpdatePostDTO } from "../Types";
import { InternalServerException, NotFoundException } from "../../../../Shared/Exceptions";
import Post from "../Model/post.model";

import { insertTags_service, deleteTags_service } from "../../Tag/Services/tag.mutations.service";
import { GraphQLError } from "graphql";

import PostRepository from "../Repository/post.repository";

export default class PostMutationsServices {
	public static async create(payload: CreatePostDTO) {
		// TODO
		/** insert if not found
		 *
		 *  1. tags
		 *  2. series
		 *  3. keywords
		 *  4. imageId
		 *
		 */

		const createdPost = await PostRepository.createOne({ ...payload });

		if (!createdPost) throw new InternalServerException("the post creation failed!");

		return createdPost;
	}

	public static async update({ _id, payload }: UpdatePostDTO) {
		// TODO
		/** insert if not found
		 *
		 *  1. tags
		 *  2. series
		 *  3. keywords
		 *  4. imageId
		 *
		 */

		const updatedPost = await PostRepository.updateOne({ _id }, { ...payload });

		if (!updatedPost) throw new NotFoundException("the post is not found!");

		return updatedPost;
	}

	// (3) Delete Post
	public static async delete(postId: DeletePostDTO) {
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
		const { deletedCount } = await PostRepository.deleteOne({ _id: postId });

		if (deletedCount === 0) throw new InternalServerException("The post deletion process failed!");

		return "The post is deleted successfully!";
	}

	public static async publish({ postId }) {
		// (1) Get post
		const post = await Post.findOne({ _id: postId });

		// If not found
		if (!post) {
			return new GraphQLError("Post Not Found", {
				extensions: { http: { status: 404 } },
			});
		}

		// If it's already published
		if (post.isPublished) {
			return new GraphQLError("Already Published", {
				extensions: { http: { status: 400 } },
			});
		}

		// (2) Update post document
		const updatedPost = Object.assign(post, {
			...post,
			isPublished: true,
			publishedAt: new Date(),
		});

		// (3) Save updated post
		await post.save();

		// (4) Return succcess message
		return {
			success: true,
			message: "Post is published successfully.",
		};
	}
}
