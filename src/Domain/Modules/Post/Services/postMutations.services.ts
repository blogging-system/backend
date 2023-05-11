import Post from "../Model/post.model";

import { insertTags_service, deleteTags_service } from "../../Tag/Services/tag.mutations.service";
import { GraphQLError } from "graphql";

export default class PostMutationsServices {
	public static async create(data) {
		// (1) Insert and return array of tags documents
		const postTags = await insertTags_service({
			postTags: data.tags,
		});

		// (2) Create Post document
		const post = new Post({
			...data,
			tags: postTags,
		});

		// (3) Save it into DB
		await post.save();

		// (4) Return Post
		return await Post.findOne({ _id: post._id }).populate("tags").lean();
	}

	// (2) Update Post
	public static async update(data) {
		// (1) Let's destructure the id from payload
		const { _id, ...restData } = data;

		// (2) Get Post document
		const post = await Post.findOne({ _id: data._id });

		// If post not found
		if (!post) {
			return new GraphQLError("Post Not Found", {
				extensions: { http: { status: 404 } },
			});
		}

		// (3) Update and return array of tags documents
		const tags = await insertTags_service({
			postTags: data.tags,
		});

		// (4) Update Payload
		const updatedPost = await Object.assign(post, { ...restData, tags });

		// (5) Save updated post and return it
		return await updatedPost.save();
	}

	// (3) Delete Post
	public static async delete({ postId }) {
		// (1) Get the post from DB
		const post = await Post.findOne({ _id: postId });

		// If not found
		if (!post) {
			return new GraphQLError("Post Not Found (May be it's already deleted).", {
				extensions: { http: { status: 404 } },
			});
		}

		// TODO:
		// (2) Check series

		// (3) Delete tags if only found in this current post
		await deleteTags_service({ tags: post.tags });

		// (4) Delete post document
		await Post.deleteOne({ _id: post._id });

		// (5) Return success message
		return {
			success: true,
			message: "The post is deleted successfully.",
		};
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
		if (post.is_published) {
			return new GraphQLError("Already Published", {
				extensions: { http: { status: 400 } },
			});
		}

		// (2) Update post document
		const updatedPost = Object.assign(post, {
			...post,
			is_published: true,
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
