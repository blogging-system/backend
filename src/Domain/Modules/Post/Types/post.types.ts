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
    tags: [Tag]
    keywords: [String]
    views: Int
    imageUrl: String
    createdAt: Date
    updatedAt: Date
    publishedAt: Date
    is_published: Boolean
  }
`;
