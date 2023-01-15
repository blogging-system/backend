import Tag from "../Model/tag.model";

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
