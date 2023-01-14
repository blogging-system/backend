import Post from "./Model/post.model";

// (1) Return Post by given ID
export const getPostById_service = async (data) => {
	return await Post.findOne({ _id: data._id });
};

// (2) Return Post by given slug
export const getPostBySlug_service = async (data) => {
	return await Post.findOne({
		slug: data.slug,
	}).populate({
		path: "tags",
		options: { lean: true },
	});

	// if (!post) return;
	// const { createdAt, authorId, ...filteredData } = post;

	// console.log(filteredData);

	// return filteredData;
};

// (3) Return All posts
export const getAllPosts_service = async () => {
	return await Post.find();
};
