export default `#graphql
  type Series {
    _id: ID
    title: String
    slug: String
    description: String
    posts: [ID]
    imageUrl: String
    views: Int
    tags: [ID]
    keywords: [String]
    publishedAt: Date
    is_published: Boolean
  }

  # extend type Query {}

  # extend type Mutation {}

`;
