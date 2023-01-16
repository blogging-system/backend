import Post from "./../Model/post.model";
import { insertTags_service } from "./../../tag/Services/tag.mutations.service";
import { GraphQLError } from "graphql";

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
	// (1) Let's destructure the id from payload
	const { _id, ...restData } = data;

	// (2) Get Post document
	const post = await Post.findOne({ _id: data._id });

	// If post not found
	if (!post) {
		return new GraphQLError("Post is not found", {
			extensions: { http: { status: 404 } },
		});
	}

	// (3) Update and return array of tags documents
	const tags = await insertTags_service({
		postTags: data.tags,
	});

	// (4) Update Payload
	const updatedPost = await Object.assign(post, { ...restData, tags });

	// (5) Save updated post and return it
	return await updatedPost.save();
};

// (3) Delete Post
export const deletePost_service = async ({ postId }) => {
	// USe joi to validate ipnput !!!!!!!!!!!

	// (1) Get post from DB
	const post = await Post.findOne({ _id: postId });

	// Not found
	if (!post) {
		return {
			name: "",
			status: 2,
			message: "The post is not found (May be already deleted).",
		};
	}

	// (2) Delete post document
	const { deletedCount } = await Post.deleteOne({ _id: postId });

	// (3) Return success message
	if (deletedCount == 1)
		return {
			name: "",
			status: 2,
			message: "The post is deleted successfully.",
		};
};
