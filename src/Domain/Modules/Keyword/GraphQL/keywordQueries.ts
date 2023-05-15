export default `#graphql
    input SuggestKeywordByNameInput {
        name: String
        limit: Int
    }

    extend type Query {
        suggestKeywordByName(data: SuggestKeywordByNameInput): [Keyword]
    }
`;
