export default `#graphql
 type Tag {
    _id: ID
    name: String
    slug: String
  }

  type TagsWithCount {
    _id: ID
    name: String
    slug: String
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
