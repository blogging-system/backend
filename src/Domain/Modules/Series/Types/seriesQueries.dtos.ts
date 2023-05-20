import { Types } from "mongoose";

export interface SuggestSeriesByTitleDTO {
	title: string;
}

export interface GetSeriesBySlugDTO {
	slug: string;
}

export interface GetSeriesByIdDTO {
	_id: Types.ObjectId;
}

export interface GetAllSeriesDTO {
	pageSize: number;
	pageNumber: number;
	sort: 1 | -1;
}
