import post from "./app/post/Types/post.types";
import tag from "./app/tag/Types/tag.types";
import series from "./app/series/Types/series.types";

const root = `#graphql
  scalar Date

  type Success {
    success: Boolean
    message: String
  }

  type Query
  type Mutation
`;

export default [root, post, tag, series];
