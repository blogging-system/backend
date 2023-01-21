import { GraphQLError } from "graphql";
import Post from "./../Model/post.model";

// TODO: Only return posts if is_published == true!!!!! for all services!!!!

// (1) Return Post by given ID
export const getPostById_service = async (data) => {
	// (1) Find Post
	const post = await Post.findOne({
		_id: data.postId,
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

// (2) Return Post by given slug
export const getPostBySlug_service = async (data) => {
	console.log({ slug: data.slug });
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

	//  TODO: Work on views (only increase if not me (admin!))

	// (2) Return Post
	return post;
};

// (3) Return All posts
export const getAllPosts_service = async (data) => {
	let posts = [];
	// (1) Find posts

	if (!data || !data.lastPostId) {
		posts = await Post.find({}).populate({ path: "tags" }).limit(5).lean(); // page 1
	}

	if (data && data.lastPostId) {
		await Post.find({ _id: { $gt: data.lastPostId } }) // Next pages
			.populate({ path: "tags" })
			.limit(data.limit)
			.lean();
	}

	// If no posts found
	if (posts.length == 0) {
		return new GraphQLError("No Posts Found", {
			extensions: { http: { status: 404 } },
		});
	}

	// (2) Return found posts in DB
	return posts;
};

export const getRelatedPosts_service = async (data) => {
	// (1) Find post
	const post = await Post.findOne({ _id: data.postId }).select("tags").lean();

	// If not found
	if (!post) {
		return new GraphQLError("Post Not Found", {
			extensions: {
				http: { status: 404 },
			},
		});
	}

	// (2) Get related Posts
	const foundPosts = await Post.find({ tags: { $all: post.tags } })
		.limit(3)
		.populate({ path: "tags" })
		.select("imageUrl tags")
		.lean();

	// If no related posts
	if (foundPosts.length <= 1) {
		return new GraphQLError("No Related Posts Found", {
			extensions: { http: { status: 404 } },
		});
	}

	// (3) Filter out the current post and return the rest found posts
	return foundPosts.filter((post) => post._id != data.postId);
};

export const getLatestPosts_service = async () => {
	const posts = await Post.find({ is_published: true })
		.sort({ publishedAt: -1 })
		.limit(3)
		.lean();

	return posts;
};

export const getPopularPosts_service = async () => {
	return await Post.find({ is_published: true })
		.sort({ views: -1 })
		.limit(3)
		.lean();
};

export const getAllPostsByTag_service = async (data) => {
	// (1) Get posts from DB
	const posts = await Post.find({ tags: data.tagId });

	// If not posts
	if (posts.length == 0) {
		return new GraphQLError("No Posts with this tag", {
			extensions: { http: { status: 404 } },
		});
	}

	// (2) Return found posts
	return posts;
};
