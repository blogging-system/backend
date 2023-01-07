import {
	getPostBySlug_service,
	getPostById_service,
	getAllPosts_service,
} from "./post.queries.service";
import {
	createPost_service,
	updatePost_service,
} from "./post.mutations.service";

export default {
	Query: {
		getPostBySlug: async (parent, { data }) => {
			return await getPostBySlug_service(data);
		},

		getPostById: async (parent, { data }) => {
			return await getPostById_service(data);
		},

		getAllPosts: async () => {
			return await getAllPosts_service();
		},
	},

	Mutation: {
		createPost: async (parent, { data }) => {
			return await createPost_service(data);
		},

		updatePost: async (parent, { data }) => {
			return await updatePost_service(data);
		},
	},
};
