export default `#graphql
	
    input CreateTagInput {
        name: String
    }

    input UpdateTagInput {
        _id: ID
        name: String
    }
    
    input DeleteTagInput {
        _id: ID
    }
    
    extend type Mutation {
        createTag(data: CreateTagInput): Tag!
        updateTag(data: UpdateTagInput): Tag!
        deleteTag(data: DeleteTagInput): Success!
    }
`;
