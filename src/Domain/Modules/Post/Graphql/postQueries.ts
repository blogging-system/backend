export default `#graphql
	input GetPostByTitleInput {
		title: String!
	}

	input GetPostBySlugInput {
		slug: String!
	}

	input GetPostByIdInput {
		postId: ID!
	}

	input GetAllPostsInput {
		lastPostId: ID
		limit: Int
	}

	input GetRelatedPostsInput {
		_id: ID!
	}

	input GetAllPostsByTagInput {
		slug: String
		page: Int
	}

	type GetAllPostsByTagResult {
		posts: [Post]!
		totalCount: Int
	}

	input GetPublishedPostsInput {
		page: Int
	}

	type GetPublishedPostsResult {
		posts: [Post]!
		totalCount: Int
	}

	extend type Query {
		getPostByTitle(data: GetPostByTitleInput): [Post]!
		getPostBySlug(data: GetPostBySlugInput): Post!
		getPostById(data: GetPostByIdInput): Post!
		getAllPosts(data: GetAllPostsInput): [Post]!
		getRelatedPosts(data: GetRelatedPostsInput): [Post]!
		getLatestPosts: [Post]!
		getPopularPosts: [Post]!
		getAllPostsByTag(data: GetAllPostsByTagInput): GetAllPostsByTagResult!
		getPublishedPosts(data: GetPublishedPostsInput): GetPublishedPostsResult!
		getUnPublishedPosts(data: GetPublishedPostsInput): GetPublishedPostsResult!
	}
`;
