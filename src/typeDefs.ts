import post from "./schema/post/post.types";

const root = `#graphql
  scalar Date
  type Query
  type Mutation
`;

export default [root, post];
