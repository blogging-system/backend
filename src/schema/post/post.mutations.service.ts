import { Post } from "./post.model";

export const createPost_service = async (data) => {
	// (1) Create post object (with our modifications)
	const post = new Post({
		...data,
	});

	// (2) Save it into DB
	await post.save();

	// (3) Return created post
	return post;
};

// (2) Update Post
export const updatePost_service = async (data) => {
	// (1) Let' remove the id from payload
	const { _id, ...restData } = data;

	// (2) Get Post document
	const post = await Post.findOne({ _id: data._id });

	// (3) Update Payload
	const updatedPost = Object.assign(post, { ...restData });


	// (4) Save updated psot
	await updatedPost.save();

	// (5) Return update post
	return updatedPost;
};
