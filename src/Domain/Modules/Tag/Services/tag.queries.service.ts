import { GraphQLError } from "graphql";
import Tag from "../Model/tag.model";
import Post from "./../../post/Model/post.model";

export const getAllTags_service = async () => {
	// (1) Get all tags in DB
	const tags = await Tag.find({}).select("_id name slug").lean();

	// If not tags found
	if (tags.length == 0) {
		return new GraphQLError("No Tags Found", {
			extensions: { http: { status: 404 } },
		});
	}

	// (2) Loop through tags array and get all posts having this tag
	const allTags = await Count_Tag_posts(tags);

	// (3) Return them with ascending order
	return await allTags
		.filter((tag) => tag.count >= 1) // to prevent 0 count tags
		.sort((current: any, next: any) => next.count - current.count); // sort ascending
};

export const getLatestTags_service = async () => {
	const tags = await Tag.find({})
		.sort({ createdAt: -1 })
		.select("_id name slug")
		.lean();

	// If not tags found
	if (tags.length == 0) {
		return new GraphQLError("No Tags Found", {
			extensions: { http: { status: 404 } },
		});
	}

	// (2) Loop through tags array and get all posts having this tag
	const allTags = await Count_Tag_posts(tags);

	return allTags
		.filter((tag) => tag.count >= 1) // to prevent 0 count tags
		.slice(0, 5);
};

/*
	Helper functions
*/

const Count_Tag_posts = async (tags) => {
	return await Promise.all(
		tags.map(async (tag: any) => {
			// (1) Get all posts having this current tag
			const postsCount = await Post.find({
				tags: tag._id,
			})
				.select("_id")
				.lean();

			// (2) Return result
			return await (tag = {
				_id: tag._id,
				name: tag.name,
				slug: tag.slug,
				count: postsCount.length,
			});
		})
	);
};
