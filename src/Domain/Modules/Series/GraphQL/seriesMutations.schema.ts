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

    input AddOrRemoveTagToSeriesInput {
        seriesId: ID
        tagId: ID
    }

    input AddOrRemoveKeywordToSeriesInput {
        seriesId: ID
        keywordId: ID
    }

    extend type Mutation {
        createSeries(data: CreateSeriesInput): Series
        updateSeries(data: UpdateSeriesInput): Series
        publishSeries(data: PublishSeriesInput): Success
        deleteSeries(data: DeleteSeriesInput): Success
        addTagToSeries(data: AddOrRemoveTagToSeriesInput): Series
        removeTagFromSeries(data: AddOrRemoveTagToSeriesInput): Series
        addKeywordToSeries(data: AddOrRemoveKeywordToSeriesInput): Series

    }
`;
