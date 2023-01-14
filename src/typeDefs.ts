import post from "./schema/post/Types/post.types";
import tag from "./schema/tag/Types/tag.types";
import series from "./schema/series/Types/series.types";

const root = `#graphql
  scalar Date
  type Query
  type Mutation
`;

export default [root, post, tag, series];
