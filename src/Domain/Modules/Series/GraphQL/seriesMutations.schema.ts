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

    input PublishSeriesInput {
        _id: ID
    }

    input DeleteSeriesInput {
        _id: ID
    }

    input AddTagToSeriesInput {
        seriesId: ID
        tagId: ID
    }

    extend type Mutation {
        createSeries(data: CreateSeriesInput): Series
        updateSeries(data: UpdateSeriesInput): Series
        publishSeries(data: PublishSeriesInput): Success
        deleteSeries(data: DeleteSeriesInput): Success
        addTagToSeries(data: AddTagToSeriesInput): Series
        
    }
`;
