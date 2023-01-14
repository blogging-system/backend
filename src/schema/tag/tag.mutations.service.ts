import Tag from "./tag.model";

export const insertTags_service = async ({ postTags }) => {
	// (1) Insert Tags
	postTags
		.toString()
		.split("-")
		.forEach(async (tag) => {
			const found = await Tag.findOne({ name: tag });
			if (found) return;
			const newTag = new Tag({ name: tag });

			await newTag.save();
		});

	// (2) Get all tags
	return await Tag.find({
		name: {
			$in: postTags.toString().split("-"),
		},
	}).select({ _id: 1 });
};
