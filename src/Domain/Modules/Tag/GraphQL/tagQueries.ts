export default `#graphql

    input SuggestTagByNameInput {
        name: String
        limit: Int
    }

    input GetTagBySlugInput {
        slug: String
    }

    input GetAllTagsInput {
        pageSize: Int
		pageNumber: Int
		sort: Int
    }

    extend type Query {
        suggestTagByName(data: SuggestTagByNameInput): [Tag]
        getTagBySlug(data: GetTagBySlugInput): Tag
        getAllTags(data: GetAllTagsInput): [Tag]
    }
`;
