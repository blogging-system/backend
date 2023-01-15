import Post from "./../Model/post.model";
import { insertTags_service } from "./../../tag/Services/tag.mutations.service";

export const createPost_service = async (data) => {
	// (1) Insert and return array of tags documents
	const postTags = await insertTags_service({
		postTags: data.tags,
	});

	// (2) Create Post document
	const post = new Post({
		...data,
		tags: postTags,
	});

	// (3) Save it into DB and return it
	return await post.save();
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

// (3) Delete Post
export const deletePost_service = async ({ postId }) => {
	// USe joi to validate ipnput !!!!!!!!!!!

	// (1) Get post from DB
	const post = await Post.findOne({ _id: postId });

	// Not found
	if (!post) {
		return {
			success: false,
			message: "The post is not found (May be already deleted).",
		};
	}

	// (2) Delete post document
	const { deletedCount } = await Post.deleteOne({ _id: postId });

	// (3) Return success message
	if (deletedCount == 1)
		return {
			success: true,
			message: "The post is deleted successfully.",
		};
};
