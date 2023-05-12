import postTypeDefs from "../Domain/Modules/Post/Graphql";
import tagTypeDefs from "../Domain/Modules/Tag/Types/tag.types";
import seriesTypeDefs from "../Domain/Modules/Series/Types/series.types";

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
