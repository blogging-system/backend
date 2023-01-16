export default `#graphql
 type Tag {
    name: String
  }

  type PopularTags {
    name: String
    count: Int
  }

  input PopularTagsInput {
    limit: Int!
  }

  extend type Query {
    getAllTags: [Tag]!
    getPopularTags(data: PopularTagsInput): [PopularTags]!
  }
`;
