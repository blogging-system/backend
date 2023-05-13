export default `#graphql
	input suggestPostByTitleInput {
		title: String
	}

	input GetPostBySlugInput {
		slug: String
	}

	input GetPostByIdInput {
		_id: ID
	}

	input GetAllPostsInput {
		pageSize: Int
		pageNumber: Int
		sort: Int
	}

	input GetAllPostsByTagInput {
		pageSize: Int
		pageNumber: Int
		sort: Int
		tagId: ID

	}

	input GetAllPostsBySeriesInput {
		pageSize: Int
		pageNumber: Int
		sort: Int
		seriesId: ID

	}

	input GetRelatedPostsInput {
		_id: ID
	}

	input GetPublishedPostsInput {
		page: Int
	}

	extend type Query {
		suggestPostByTitle(data: suggestPostByTitleInput): [Post]!
		getPostBySlug(data: GetPostBySlugInput): Post!
		getPostById(data: GetPostByIdInput): Post!
		getAllPosts(data: GetAllPostsInput): [Post]!
		getAllPostsByTag(data: GetAllPostsByTagInput): [Post]!
		getAllPostsBySeries(data: GetAllPostsBySeriesInput): [Post]!
		getAllPostsByKeyword: [Post]!
		getRelatedPosts(data: GetRelatedPostsInput): [Post]!
		getLatestPosts: [Post]!
		getPopularPosts: [Post]!
		getPublishedPosts(data: GetPublishedPostsInput): [Post]!
		getUnPublishedPosts(data: GetPublishedPostsInput): [Post]!
	}
`;
