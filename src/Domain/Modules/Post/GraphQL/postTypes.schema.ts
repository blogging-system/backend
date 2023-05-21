export default `#graphql
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
		isPublishedAt: Date
		createdAt: Date
		updatedAt: Date
	}
`;
