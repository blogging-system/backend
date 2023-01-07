import { Post } from "./post.model";

// (1) Return Post by given ID
export const getPostById_service = async (data) => {
	return await Post.findOne({ _id: data._id });
};

// (2) Return Post by given slug
export const getPostBySlug_service = async (data) => {
	const post = await Post.collection.findOne({
		slug: data.slug,
	});

	const { views, createdAt, authorId, ...filteredData } = post;

	console.log(filteredData);

	return filteredData;
};

// (3) Return All posts
export const getAllPosts_service = async () => {
	return await Post.find();
};
