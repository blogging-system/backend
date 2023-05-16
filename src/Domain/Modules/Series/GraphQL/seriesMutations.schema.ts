export default `#graphql
    input CreateSeriesInput {
        title: String
        description: String
        image: ID
        tags: [ID]
        keywords: [ID]
    }

    extend type Mutation {
        createSeries(data: CreateSeriesInput): Series
    }
`;
