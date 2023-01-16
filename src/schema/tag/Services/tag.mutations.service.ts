import Tag from "../Model/tag.model";
import Post from "./../../post/Model/post.model";

export const insertTags_service = async ({ postTags }) => {
	// (1) Insert Tags
	postTags
		.toString()
		.split("-")
		.forEach(async (tag) => {
			// If tag is already created
			const found = await Tag.findOne({ name: tag });
			if (found) return;

			// IF not found, then create new tag and save it
			const newTag = new Tag({ name: tag });
			return await newTag.save();
		});

	// (2) Get all tags
	return await Tag.find({
		name: {
			$in: postTags.toString().split("-"),
		},
	});
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
