import post from "./../Domain//Modules/Post/Types/post.types";
import tag from "./../Domain/Modules/Tag/Types/tag.types";
import series from "./../Domain/Modules/Series/Types/series.types";

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
