export default `#graphql
	type Tag {
		_id: ID
		name: String
		createdAt: Date
		updatedAt: Date
	}

	type Post {
		_id: ID
		title: String
		slug: String
		description: String
		content: String
		imageId: ID
		tags: [Tag]
		series: [Tag]
		keywords: [Tag]
		isPublished: Boolean
		publishedAt: Date
		createdAt: Date
		updatedAt: Date
	}
`;
