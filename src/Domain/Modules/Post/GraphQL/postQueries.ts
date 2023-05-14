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

	input GetAllPostsByKeywordInput {
		pageSize: Int
		pageNumber: Int
		sort: Int
		keywordId: ID

	}

	input GetRelatedPostsInput {
		pageSize: Int
		pageNumber: Int
		sort: Int
		postId: ID
	}

	input GetUnPublishedPostsInput {
		pageSize: Int
		pageNumber: Int
	}

	extend type Query {
		suggestPostByTitle(data: suggestPostByTitleInput): [Post]!
		getPostBySlug(data: GetPostBySlugInput): Post!
		getPostById(data: GetPostByIdInput): Post!
		getAllPosts(data: GetAllPostsInput): [Post]!
		getAllPostsByTag(data: GetAllPostsByTagInput): [Post]!
		getAllPostsBySeries(data: GetAllPostsBySeriesInput): [Post]!
		getAllPostsByKeyword(data: GetAllPostsByKeywordInput): [Post]!
		getRelatedPosts(data: GetRelatedPostsInput): [Post]!
		getPopularPosts: [Post]!
		getUnPublishedPosts(data: GetUnPublishedPostsInput): [Post]!
	}
`;
