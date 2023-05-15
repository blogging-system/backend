export default `#graphql

    input SuggestTagByNameInput {
        name: String
        limit: Int
    }

    input GetTagBySlugInput {
        slug: String
    }

    extend type Query {
        suggestTagByName(data: SuggestTagByNameInput): [Tag]
        getTagBySlug(data: GetTagBySlugInput): Tag
    }
`;
