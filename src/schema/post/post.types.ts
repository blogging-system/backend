export default `#graphql
  type Post {
    _id: ID!
    name: String
    createdAt: Date
  }

  input GetPost {
    _id: ID!
  }

  input CreatePost {
    name: String!
  }

  extend type Query {
    getPost(data: GetPost): Post
  }

  extend type Mutation {
    createPost(data: CreatePost): Post!
  }
`;
