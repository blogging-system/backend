export default `#graphql
	input suggestPostByTitleInput {
		title: String!
	}

	input GetPostBySlugInput {
		slug: String!
	}

	input GetPostByIdInput {
		_id: ID!
	}

	input GetAllPostsInput {
		pageSize: Int
		pageNumber: Int
		sort: Int
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
		suggestPostByTitle(data: suggestPostByTitleInput): [Post]!
		getPostBySlug(data: GetPostBySlugInput): Post!
		getPostById(data: GetPostByIdInput): Post!
		getAllPosts(data: GetAllPostsInput): [Post]!
		getAllPostsByTag(data: GetAllPostsByTagInput): GetAllPostsByTagResult!
		getAllPostsBySeries: [Post]!
		getAllPostsByKeyword: [Post]!
		getRelatedPosts(data: GetRelatedPostsInput): [Post]!
		getLatestPosts: [Post]!
		getPopularPosts: [Post]!
		getPublishedPosts(data: GetPublishedPostsInput): GetPublishedPostsResult!
		getUnPublishedPosts(data: GetPublishedPostsInput): GetPublishedPostsResult!
	}
`;
