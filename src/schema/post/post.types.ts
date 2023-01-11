export default `#graphql
  type Post {
    _id: ID
    seriesId: ID
    authorId: ID
    title: String
    slug: String
    description: String
    content: String
    tags: [String]
    keywords: [String]
    views: Int
    imageUrl: String
    createdAt: Date
    updatedAt: Date
    publishedAt: Date
    is_published: Boolean
  }

  input GetPostBySlugInput {
    slug: String!
  }

  input GetPostByIdInput {
    _id: ID!
  }

  input CreatePostInput {
    seriesId: ID
    title: String!
    description: String!
    content: String!
    tags: [String]!
    keywords: [String!]!
    imageUrl: String!
    authorId: ID
  }

  input UpdatePostInput {
    _id: ID
    seriesId: ID
    title: String
    description: String
    content: String
    tags: [String]
    keywords: [String]
    imageUrl: String
    authorId: ID
  }

  extend type Query {
    getPostBySlug(data: GetPostBySlugInput): Post
    getPostById(data: GetPostByIdInput): Post
    getAllPosts: [Post]
  }

  extend type Mutation {
    createPost(data: CreatePostInput): Post!
    updatePost(data: UpdatePostInput): Post!
  }
`;