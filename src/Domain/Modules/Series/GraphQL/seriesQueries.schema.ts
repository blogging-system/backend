export default `#graphql
    input SuggestSeriesByTitleInput {
        title: String
    }

    extend type Query {
        suggestSeriesByTitle(data: SuggestSeriesByTitleInput): [Series]
    }
`;
