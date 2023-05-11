export default `#graphql
	input CreatePostInput {
		title: String!
		description: String!
		content: String!
		tags: [String!]!
		keywords: [String!]!
		imageUrl: String!
	}

	input UpdatePostInput {
		_id: ID!
		title: String
		description: String
		content: String
		tags: [String!]
		keywords: [String!]
		imageUrl: String
	}

	input DeletePostInput {
		postId: ID
	}

	input PublishPostInput {
		postId: ID
	}

	extend type Mutation {
		createPost(data: CreatePostInput): Post!
		updatePost(data: UpdatePostInput): Post!
		deletePost(data: DeletePostInput): Success
		publishPost(data: PublishPostInput): Success
	}
`;
