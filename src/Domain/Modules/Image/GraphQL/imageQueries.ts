export default `#graphql
    input GetImageByIdInput {
        _id: ID
    }

    extend type Query {
        getImageById(data: GetImageByIdInput): Image
    }
`;
