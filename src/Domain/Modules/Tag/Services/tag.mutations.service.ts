import { GraphQLError } from "graphql";
import Tag from "../Model/tag.model";
import Post from "./../../Post/Model/post.model";

export const insertTags_service = async ({ postTags }) => {
	// (1) Insert Tags
	const [...tags] = await Promise.all(
		postTags.map(async (tag) => {
			const found = await Tag.findOne({ name: tag });

			// If tag is already created
			if (found) {
				return found._id;

				// IF not found, then create new tag and save it
			} else {
				const newTag = new Tag({ name: tag });
				const { _id } = await newTag.save();

				return _id;
			}
		})
	);

	// (2) Return tags
	return tags;
};

export const deleteTags_service = async ({ tags }) => {
	//  Loop through the given tags array
	await tags.forEach(async (tagId) => {
		// (1) Find all posts that has this tag
		const foundPosts = await Post.find({
			tags: { $in: tagId },
		});

		/*
			(2) If only one post (current post that we want to delete) has this tag,
			then delete it! 
		*/
		if (foundPosts && foundPosts.length <= 1) {
			await Tag.deleteOne({ _id: tagId });
			console.log("deleted", tagId);
		}
	});
};

export const deleteTag_service = async (data) => {
	// (1) Get tag from DB
	const tag = await Tag.findOne({ _id: data.tagId }).select("_id").lean();

	// If not found
	if (!tag) {
		return new GraphQLError("Tag Not Found (May be already deleted)", {
			extensions: { http: { status: 404 } },
		});
	}

	// (2) Get all posts have this tag
	const posts = await Post.find({ tags: data.tagId }).select("tags");

	// (3) Loop through them and delete the tag from them
	posts.map(async (post) => {
		post.tags = post.tags.filter((tagId) => tagId != data.tagId);
		return await post.save();
	});

	// (4) TODO: Do the same with series collection

	// (5) Delete the tag document itself now
	await Tag.deleteOne({ _id: data.tagId });

	return { success: true, message: "Tag is deleted successfully." };
};
