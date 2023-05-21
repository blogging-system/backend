export default `#graphql
    input CreateImageInput {
        url: String
        altText: String
    }

    extend type Mutation {
        createImage(data: CreateImageInput): Image
    }
`;
