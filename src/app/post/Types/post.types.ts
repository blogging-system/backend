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

  input GetPostBySlugInput {
    slug: String!
  }

  input GetPostByIdInput {
    postId: ID!
  }

  input GetAllPostsInput {
    lastPostId: ID
    limit: Int
  }

  input GetRelatedPostsInput {
    postId: ID!
  }

  input GetAllPostsByTagInput {
    slug: String
    page: Int
  }

  type GetAllPostsByTagResult {
    posts: [Post]!
    totalCount: Int
  }

  input CreatePostInput {
    title: String
    description: String
    content: String
    tags: String
    keywords: [String!]
    imageUrl: String
  }

  input UpdatePostInput {
    _id: ID
    title: String
    description: String
    content: String
    tags: String
    keywords: [String]
    imageUrl: String
  }

  input DeletePostInput {
    postId: ID
  }

  input PublishPostInput {
    postId: ID
  }

  extend type Query {
    getPostBySlug(data: GetPostBySlugInput): Post!
    getPostById(data: GetPostByIdInput): Post!
    getAllPosts(data: GetAllPostsInput): [Post]!
    getRelatedPosts(data: GetRelatedPostsInput): [Post]!
    getLatestPosts: [Post]!
    getPopularPosts: [Post]!
    getAllPostsByTag(data: GetAllPostsByTagInput): GetAllPostsByTagResult!
  }

  extend type Mutation {
    createPost(data: CreatePostInput): Post!
    updatePost(data: UpdatePostInput): Post!
    deletePost(data: DeletePostInput): Success
    publishPost(data: PublishPostInput): Success
  }
`;
