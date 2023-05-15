export interface SuggestKeywordByNameDTO {
	name: string;
	limit: number;
}

export interface GetAllKeywordsDTO {
	pageSize: number;
	pageNumber: number;
	sort: 1 | -1;
}
