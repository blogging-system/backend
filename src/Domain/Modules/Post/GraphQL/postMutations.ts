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

	input DeleteOrPublishPostInput {
		_id: ID
	}


	extend type Mutation {
		createPost(data: CreatePostInput): Post!
		updatePost(data: UpdatePostInput): Post!
		deletePost(data: DeleteOrPublishPostInput): Success!
		publishPost(data: DeleteOrPublishPostInput): Success!
	}
`;
