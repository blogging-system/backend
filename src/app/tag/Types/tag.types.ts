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

 input DeleteTagInput {
  tagId: ID
 }

  extend type Query {
    getAllTags: [TagsWithCount]!
    getLatestTags: [Tag]!
  }

  extend type Mutation {
    deleteTag(data: DeleteTagInput): Success
  }
`;
