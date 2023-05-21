export default `#graphql
    input CreateImageInput {
        url: String
        altText: String
    }

    input UpdateImageInput {
        _id: ID
        payload: CreateImageInput
    }

    extend type Mutation {
        createImage(data: CreateImageInput): Image
        updateImage(data: UpdateImageInput): Image
    }
`;
