import postTypeDefs from "./Modules/Post/Types";
import tagTypeDefs from "./Modules/Tag/Types/tag.types";
import seriesTypeDefs from "./Modules/Series/Types/series.types";

const root = `#graphql
  scalar Date

  type Success {
    success: Boolean
    message: String
  }

  type Query
  type Mutation
`;

export default [root, postTypeDefs, tagTypeDefs, seriesTypeDefs];
