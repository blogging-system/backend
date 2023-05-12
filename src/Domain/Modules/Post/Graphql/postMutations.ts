export default `#graphql
	input CreatePostInput {
		title: String
		description: String
		content: String
		imageId: ID
		tags: [ID]
		series: [ID]
		keywords: [ID]
	}

	input UpdatePostInput {
  		_id: ID
		payload: CreatePostInput
	}

	input PostIdInput {
		postId: ID
	}


	extend type Mutation {
		createPost(data: CreatePostInput): Post!
		updatePost(data: UpdatePostInput): Post!
		deletePost(data: PostIdInput): Success
		publishPost(data: PostIdInput): Success
	}
`;
