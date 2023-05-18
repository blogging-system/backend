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
