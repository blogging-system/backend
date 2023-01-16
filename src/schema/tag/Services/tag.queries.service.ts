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
	const tags = await Tag.find({}).select("_id name").limit(data.limit).lean();

	// const popularTags = await tags.map(async (tag: any) => {
	// 	const postsCount = await Post.find({
	// 		tags: tag._id,
	// 	})
	// 		.select("_id name")
	// 		.lean();

	// 	return await (tag = { name: tag.name, count: postsCount.length });
	// });

	const popularTags = await Promise.all([
		await tags.map(async (tag: any) => {
			const postsCount = await Post.find({
				tags: tag._id,
			})
				.select("_id name")
				.lean();

			return await (tag = { name: tag.name, count: postsCount.length });
		}),
	]);

	await console.log(popularTags);
	return popularTags;
};
