export interface SuggestTagByNameDTO {
	name: string;
	limit: number;
}

export interface GetTagBySlugDTO {
	slug: string;
}

export interface GetAllTagsDTO {
	pageSize: number;
	pageNumber: number;
	sort: 1 | -1;
}
