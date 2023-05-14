export default `#graphql
	
    input CreateTagInput {
        name: String
    }

    input UpdateTagInput {
        _id: ID
        name: String
    }
    
    extend type Mutation {
        createTag(data: CreateTagInput): Tag!
        updateTag(data:UpdateTagInput): Tag!
    }
`;
