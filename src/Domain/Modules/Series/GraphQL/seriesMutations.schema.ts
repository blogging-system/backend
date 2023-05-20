export default `#graphql
    input CreateSeriesInput {
        title: String
        description: String
        image: ID
    }

    input UpdateSeriesInput {
        _id: ID
        payload: CreateSeriesInput
    }


    input DeleteSeriesInput {
        _id: ID
    }

    extend type Mutation {
        createSeries(data: CreateSeriesInput): Series
        updateSeries(data: UpdateSeriesInput): Series
        deleteSeries(data: DeleteSeriesInput): Success
    }
`;
