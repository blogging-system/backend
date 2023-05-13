import { Types } from "mongoose";

export interface SuggestPostByTitleDTO {
	title: string;
}

export interface GetPostBySlugDTO {
	slug: string;
}

export interface GetPostByIdDTO {
	_id: Types.ObjectId;
}

export interface GetAllPostsDTO {
	pageSize: number;
	pageNumber: number;
	sort: 1 | -1;
}

export interface GetAllPostsByTagDTO {
	pageSize: number;
	pageNumber: number;
	sort: 1 | -1;
	tagId: Types.ObjectId;
}

export interface GetAllPostsBySeriesDTO {
	pageSize: number;
	pageNumber: number;
	sort: 1 | -1;
	seriesId: Types.ObjectId;
}

export interface GetAllPostsByKeywordDTO {
	pageSize: number;
	pageNumber: number;
	sort: 1 | -1;
	keywordId: Types.ObjectId;
}
