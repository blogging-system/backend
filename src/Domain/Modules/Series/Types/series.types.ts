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
    isPublished: Boolean
  }

  input GetAllSeriesInput  {
    page: Int
  }

  type GetAllSeriesResult {
    series: [Series]!
    totalCount: Int
  }

  type GetSeriesBySlugResult {
    series: Series!
    totalCount: Int
  }

  input GetSeriesByTitleInput {
    title: String!
  }

  input GetSeriesBySlugInput {
    slug: String
    page: Int
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
    getAllSeries(data: GetAllSeriesInput): GetAllSeriesResult!
    getSeriesBySlug(data: GetSeriesBySlugInput): GetSeriesBySlugResult!
    getSeriesByTitle(data: GetSeriesByTitleInput): [Series!]!
  }

  extend type Mutation {
    createSeries(data: CreateSeriesInput): Series!
    deleteSeries(data: DeleteOrPublishSeriesInput): Success!
    addPostToSeries(data: AddOrRemovePostFromSeriesInput): Success!
    removePostFromSeries(data:AddOrRemovePostFromSeriesInput): Success!
    publishSeries(data:DeleteOrPublishSeriesInput): Success!
  }

`;
