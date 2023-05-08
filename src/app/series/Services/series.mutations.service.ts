import { GraphQLError } from "graphql";

import Series from "../Model/series.model";
import Post from "./../../post/Model/post.model";

export const createSeries_service = async (data) => {
	// (1) Create series
	const series = new Series({ ...data });

	// (2) Save series
	await series.save();

	// (3) Return series
	return series;
};

export const deleteSeries_service = async (data) => {
	// (1) Get series from DB
	const series = await Series.findOne({ _id: data.seriesId })
		.select("_id posts")
		.lean();

	// If not found
	if (!series) {
		return new GraphQLError("Series Not Found", {
			extensions: { http: { status: 404 } },
		});
	}

	// If series has posts
	if (series.posts.length >= 1) {
		return new GraphQLError(
			"Sorry, You need to remove all associated posts first.",
			{
				extensions: { http: { status: 400 } },
			}
		);
	}

	// (2) Delete series
	await Series.deleteOne({ _id: data.seriesId });

	return {
		success: true,
		message: "Series is deleted successfully",
	};
};

export const addPostToSeries_service = async (data) => {
	// (1) Get post from DB
	const post = await Post.findOne({ _id: data.postId }).select("tags").lean();

	// If post not found
	if (!post) {
		return new GraphQLError("Post Not Found", {
			extensions: { http: { status: 404 } },
		});
	}

	// (2) Get series from DB
	const series = await Series.findOne({ _id: data.seriesId }).select(
		"posts tags"
	);

	// If series is not found
	if (!series) {
		return new GraphQLError("Series Not Found", {
			extensions: { http: { status: 404 } },
		});
	}

	// If series already have this postId
	if (series.posts.includes(post._id)) {
		return new GraphQLError("This post is already added", {
			extensions: { http: { status: 400 } },
		});
	}

	// (3) update series posts
	await series.posts.push(post._id);

	// (4) Update series tags
	await post.tags.forEach((tagId) => {
		if (!series.tags.includes(tagId)) {
			return series.tags.push(tagId);
		}
	});

	// (5) save series posts
	await series.save();

	// (6) Return success message
	return { success: true, message: "Post is added successfully" };
};

export const removePostFromSeries_service = async (data) => {
	// (1) Get post and series from DB
	const [post, series] = await Promise.all([
		Post.findOne({ _id: data.postId }).select("tags").populate("tags").lean(),
		Series.findOne({ _id: data.seriesId }).select("posts"),
	]);

	// If post not found
	if (!post) {
		return new GraphQLError("Post Not Found", {
			extensions: { http: { status: 404 } },
		});
	}

	// If series not found
	if (!series) {
		return new GraphQLError("Series Not Found", {
			extensions: { http: { status: 404 } },
		});
	}

	// If postId is not found among series posts IDs
	if (!series.posts.includes(post._id)) {
		return new GraphQLError("Post Not Found (Maybe already removed)", {
			extensions: { http: { status: 404 } },
		});
	}

	// (2) Remove post from series posts
	series.posts = await series.posts.filter(
		(postId) => postId.toString() != post._id.toString()
	);

	// (3) Prepare tags payload and update
	//  - step 1: Get all tags of all posts attached to this series
	const [...allPostsTags] = await Promise.all(
		series.posts.map(async (postId) => {
			const post = await Post.findOne({ _id: postId })
				.select("tags")
				.populate("tags")
				.lean();
			return post.tags;
		})
	);

	// - step 2: Make it flat
	const allPostsTagsFlat = [
		...new Set(
			Array(allPostsTags)
				.flat(Infinity)
				.map((el: any) => (el = el._id.toString()))
		),
	];
	// ! test comment 
	// step 3: Update series tags
	series.tags = await post.tags.filter((tagId: any) => {
		if (!allPostsTagsFlat.includes(tagId._id.toString())) {
			return (tagId = undefined);
		}
		return tagId;
	});

	// (4) Save series document
	await series.save();

	// (5) Return succes message
	return {
		success: true,
		message: "Post is removed successfully",
	};
};

export const publishSeries_service = async (data) => {
	// (1) Get series
	const series = await Series.findOne({ _id: data.seriesId }).select(
		"is_published"
	);

	// If not found
	if (!series) {
		return new GraphQLError("Series Not Found", {
			extensions: { http: { status: 404 } },
		});
	}

	// If already published

	if (series.is_published) {
		return new GraphQLError("Series is already published", {
			extensions: { http: { status: 400 } },
		});
	}

	// (2) Update series
	series.is_published = true;
	series.publishedAt = new Date();

	// (3) Save series
	await series.save();

	// (4) Return success message
	return {
		success: true,
		message: "Series is published successfully",
	};
};
