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

 input DeleteTagInput {
  tagId: ID
 }

  extend type Query {
    getAllTags: [Tag]!
    getPopularTags(data: PopularTagsInput): [PopularTags]!
    getLatestTags: [Tag]!
  }

  extend type Mutation {
    deleteTag(data: DeleteTagInput): Success
  }
`;
