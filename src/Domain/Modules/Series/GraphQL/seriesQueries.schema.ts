export default `#graphql
    input SuggestSeriesByTitleInput {
        title: String
    }

    input GetSeriesBySlugInput {
        slug: String
    }

    input GetSeriesByIdInput {
        _id: ID
    }

    extend type Query {
        suggestSeriesByTitle(data: SuggestSeriesByTitleInput): [Series]
        getSeriesBySlug(data: GetSeriesBySlugInput): Series
        getSeriesById(data: GetSeriesByIdInput): Series
    }
`;
