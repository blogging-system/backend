import { GraphQLError } from "graphql";
import Post from "./../Model/post.model";

// (1) Return Post by given ID
export const getPostById_service = async (data) => {
	return await Post.findOne({ _id: data._id });
};

// (2) Return Post by given slug
export const getPostBySlug_service = async (data) => {
	// (1) Find Post
	const post = await Post.findOne({
		slug: data.slug,
	})
		.populate({
			path: "tags",
		})
		.lean();

	// If not found
	if (!post) {
		return new GraphQLError("Post Not Found", {
			extensions: { http: { status: 404 } },
		});
	}

	// TODO: Work on views (only increase if not me (admin!))

	// (2) Return Post
	return post;
};

// (3) Return All posts
export const getAllPosts_service = async () => {
	return await Post.find();
};
