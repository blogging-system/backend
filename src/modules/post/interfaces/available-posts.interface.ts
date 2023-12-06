import { DocumentIdType } from '@src/shared/data/types'

export interface ArePostsAvailableForGivenEntitiesIds {
  seriesId?: DocumentIdType
  tagId?: DocumentIdType
  keywordId?: DocumentIdType
}

export interface ArePostsAvailableForGivenEntitiesIdsQuery {
  series?: string
  tags?: string
  keywords?: string
}
