export class CountDocumentsDto {
  isPublished?: boolean;
  tagId?: string;
  keywordId?: string;
  seriesId?: string;
}

export class CountDocumentsQuery {
  isPublished?: boolean;
  tags?: string;
  keywords?: string;
  series?: string;
}
