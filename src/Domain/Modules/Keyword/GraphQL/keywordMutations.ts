export default `#graphql
	input CreateKeywordInput {
		name: String
	}

	input UpdateKeywordInput {
		_id: ID
		name: String
	}

	input DeleteKeywordInput {
		_id: ID
	}

	extend type Mutation {
		createKeyword(data: CreateKeywordInput): Tag
		updateKeyword(data: UpdateKeywordInput): Tag
		deleteKeyword(data: DeleteKeywordInput): Success
	}
`;
