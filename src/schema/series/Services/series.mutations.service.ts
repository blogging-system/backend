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
	const post = await Post.findOne({ _id: data.postId })
		.select("_id tags")
		.lean();

	// If post not found
	if (!post) {
		return new GraphQLError("Post Not Found", {
			extensions: { http: { status: 404 } },
		});
	}

	// (2) Get series from DB
	const series = await Series.findOne({ _id: data.seriesId }).select(
		"_id posts tags"
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
