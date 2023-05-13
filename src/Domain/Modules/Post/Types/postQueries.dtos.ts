import { Types } from "mongoose";

export interface SuggestPostByTitleDTO {
	title: string;
}

export interface getPostBySlugDTO {
	slug: string;
}

export interface getPostByIdDTO {
	_id: Types.ObjectId;
}

export interface getAllPostsDTO {
	pageSize: number;
	pageNumber: number;
	sort: 1 | -1;
}
