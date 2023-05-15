import postTypeDefs from "../Domain/Modules/Post/GraphQL";
import tagTypeDefs from "../Domain/Modules/Tag/GraphQL";
import keywordTypeDefs from "../Domain/Modules/Keyword/GraphQL";
// import seriesTypeDefs from "../Domain/Modules/Series/Types/series.types";

const root = `#graphql
  scalar Date
  
  type Success {
    success: Boolean
    name: String
    status: String
    code: String
    message: String
  }
  
  type Query
  
  type Mutation
`;

export default [root, postTypeDefs, tagTypeDefs, keywordTypeDefs];
