"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `#graphql
  type Post {
    _id: ID!
    seriesId: ID
    authorId: ID!
    title: String!
    slug: String!
    description: String!
    content: String!
    tags: [String]!
    keywords: [String!]!
    views: Int!
    imageUrl: String!
    createdAt: Date!
    updatedAt: Date!
    publishedAt: Date
    is_published: Boolean!
  }

  input GetPostBySlug {
    slug: String!
  }

  input CreatePost {
    seriesId: ID
    title: String!
    description: String!
    content: String!
    tags: [String]!
    keywords: [String!]!
    imageUrl: String!
    authorId: ID
  }

  extend type Query {
    getPostBySlug(data: GetPostBySlug): Post
  }

  extend type Mutation {
    createPost(data: CreatePost): Post!
  }
`;
