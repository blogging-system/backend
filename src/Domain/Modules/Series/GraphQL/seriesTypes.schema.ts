export default `#graphql
    type Series {
        _id: ID
        title: String
        slug: String
        description: String
        image: ID
		tags: [Tag]
		keywords: [Tag]
		isPublished: Boolean
		isPublishedAt: Date
        createdAt: Date
		updatedAt: Date
    }
`;
