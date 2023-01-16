import Post from "./../Model/post.model";

import {
	insertTags_service,
	deleteTags_service,
} from "./../../tag/Services/tag.mutations.service";
import { GraphQLError } from "graphql";

export const createPost_service = async (data) => {
	// (1) Insert and return array of tags documents
	const postTags = await insertTags_service({
		postTags: data.tags,
	});

	// (2) Create Post document
	const post = new Post({
		...data,
		tags: postTags,
	});

	// (3) Save it into DB and return it
	return await post.save();
};

// (2) Update Post
export const updatePost_service = async (data) => {
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
};

// (3) Delete Post
export const deletePost_service = async ({ postId }) => {
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
};
