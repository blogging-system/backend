export default `#graphql
  type Series {
    _id: ID
    title: String
    slug: String
    description: String
    posts: [Post]
    imageUrl: String
    views: Int
    tags: [Tag]
    keywords: [String]
    publishedAt: Date
    is_published: Boolean
  }

  input GetAllSeriesInput  {
    limit: Int
    lastSeriesId: ID
  }

  input GetSeriesBySlugInput {
    slug: String
  }

  input CreateSeriesInput {
    title: String
    description: String
    imageUrl: String
    keywords: [String]
  }


  input DeleteOrPublishSeriesInput {
    seriesId: ID
  }

  input AddOrRemovePostFromSeriesInput {
    postId: ID!
    seriesId: ID!
  }

  extend type Query {
    getAllSeries(data: GetAllSeriesInput): [Series]!
    getSeriesBySlug(data: GetSeriesBySlugInput): Series!
  }

  extend type Mutation {
    createSeries(data: CreateSeriesInput): Series!
    deleteSeries(data: DeleteOrPublishSeriesInput): Success!
    addPostToSeries(data: AddOrRemovePostFromSeriesInput): Success!
    removePostFromSeries(data:AddOrRemovePostFromSeriesInput): Success!
    publishSeries(data:DeleteOrPublishSeriesInput): Success!
  }

`;
