export default `#graphql
    input SuggestSeriesByTitleInput {
        title: String
    }

    input GetSeriesBySlugInput {
        slug: String
    }

    extend type Query {
        suggestSeriesByTitle(data: SuggestSeriesByTitleInput): [Series]
        getSeriesBySlug(data: GetSeriesBySlugInput): Series
    }
`;
