export default `#graphql
	input CreateKeywordInput {
		name: String
	}

	input UpdateKeywordInput {
		_id: ID
		name: String
	}

	extend type Mutation {
		createKeyword(data: CreateKeywordInput): Tag
		updateKeyword(data: UpdateKeywordInput): Tag
	}
`;
