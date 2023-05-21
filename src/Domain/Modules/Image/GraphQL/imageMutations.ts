export default `#graphql
    input CreateImageInput {
        url: String
        altText: String
    }

    input UpdateImageInput {
        _id: ID
        payload: CreateImageInput
    }


    input DeleteImageInput {
        _id: ID
    }

    extend type Mutation {
        createImage(data: CreateImageInput): Image
        updateImage(data: UpdateImageInput): Image
        deleteImage(data: DeleteImageInput): Success
    }
`;
