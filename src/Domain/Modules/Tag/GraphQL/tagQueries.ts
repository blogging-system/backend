export default `#graphql

    input SuggestTagByNameInput {
        name: String
        limit: Int
    }

    input getTagBySlugInput {
        slug: String
    }

    extend type Query {
        suggestTagByName(data: SuggestTagByNameInput): [Tag]
        getTagBySlug(data: GetTagBySlugInput): Tag
    }
`;
