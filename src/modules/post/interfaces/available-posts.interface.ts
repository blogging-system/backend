import { DocumentIdType } from "@src/shared/contracts/types";

export interface ArePostsAvailableForGivenEntitiesIds {
  seriesId?: DocumentIdType;
  tagId?: DocumentIdType;
  keywordId?: DocumentIdType;
}

export interface ArePostsAvailableForGivenEntitiesIdsQuery {
  series?: string;
  tags?: string;
  keywords?: string;
}
