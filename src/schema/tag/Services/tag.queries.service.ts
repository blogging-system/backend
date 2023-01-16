import { GraphQLError } from "graphql";
import Tag from "./../Model/tag.model";
import Post from "./../../post/Model/post.model";

export const getAllTags_service = async () => {
	// (1) Get all tags
	const tags = await Tag.find({}).lean();

	// If not tags found
	if (!tags) {
		return new GraphQLError("No Tags Found", {
			extensions: { http: { status: 404 } },
		});
	}

	// (2) Return found tags
	return tags;
};

export const getPopularTags_service = async (data) => {
	// (1) Get all tags in DB
	const tags = await Tag.find({}).select("_id name").lean();

	// (2) Loop through tags array and get all posts having this tag
	const popularTags = await Promise.all(
		tags.map(async (tag: any) => {
			// (1) Get all posts having this current tag
			const postsCount = await Post.find({
				tags: tag._id,
			})
				.select("_id")
				.lean();

			// (2) Return result
			return await (tag = { name: tag.name, count: postsCount.length });
		})
	);

	// (3) Return popular tags according to the provided limit
	return popularTags
		.sort((current: any, next: any) => next.count - current.count) // sort ascending
		.slice(0, data.limit);
};

export const getLatestTags_service = async () => {
	return await Tag.find({})
		.sort({ createdAt: -1 })
		.select("_id name")
		.limit(5)
		.lean();
};
