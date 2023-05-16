export default `#graphql
    input CreateSeriesInput {
        title: String
        description: String
        image: ID
        tags: [ID]
        keywords: [ID]
    }

    input UpdateSeriesInput {
        _id: ID
        payload: CreateSeriesInput
    }

    extend type Mutation {
        createSeries(data: CreateSeriesInput): Series
        updateSeries(data: UpdateSeriesInput): Series
    }
`;
