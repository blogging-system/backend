export default `#graphql
 type Tag {
    name: String
  }

  type TagsWithCount {
    tagId: ID
    name: String
    count: Int
  }

  input GetAllTagsInput {
    limit: Int
  }

 input DeleteTagInput {
  tagId: ID
 }

  extend type Query {
    getAllTags(data: GetAllTagsInput): [TagsWithCount]!
    getLatestTags: [Tag]!
  }

  extend type Mutation {
    deleteTag(data: DeleteTagInput): Success
  }
`;
