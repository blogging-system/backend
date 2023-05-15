export default `#graphql
	input CreateKeywordInput {
		name: String
	}

	extend type Mutation {
		createKeyword(data: CreateKeywordInput): Tag!
	}
`;
