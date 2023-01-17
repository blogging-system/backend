export default `#graphql
  type Series {
    _id: ID
    title: String
    slug: String
    description: String
    posts: [ID]
    imageUrl: String
    views: Int
    tags: [ID]
    keywords: [String]
    publishedAt: Date
    is_published: Boolean
  }


  input CreateSeriesInput {
    title: String
    description: String
    imageUrl: String
    keywords: [String]
  }


  input DeleteSeriesInput {
    seriesId: ID
  }

  # extend type Query {}

  extend type Mutation {
    createSeries(data: CreateSeriesInput): Series!
    deleteSeries(data: DeleteSeriesInput): Success!
  }

`;
