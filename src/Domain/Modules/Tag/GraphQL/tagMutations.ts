export default `#graphql
	
    input CreateTagInput {
        name: String
    }

    extend type Mutation {
        createTag(data: CreateTagInput): Tag!
    }
`;
