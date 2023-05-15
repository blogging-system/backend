export default `#graphql
    input SuggestKeywordByNameInput {
        name: String
        limit: Int
    }

    input GetAllKeywordsInput {
        pageSize: Int
        pageNumber: Int
        sort: Int
    }

    extend type Query {
        suggestKeywordByName(data: SuggestKeywordByNameInput): [Keyword]
        getAllKeywords(data: GetAllKeywordsInput): [Keyword]
    }
`;
