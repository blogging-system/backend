import post from "./schema/post/post.types";
import tag from "./schema/tag/tag.types";
import series from "./schema/series/series.types";

const root = `#graphql
  scalar Date
  type Query
  type Mutation
`;

export default [root, post, tag, series];
