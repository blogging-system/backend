import { Types } from "mongoose";
export interface CreateSeriesDTO {
	title: string;
	description: string;
	image: Types.ObjectId;
	tags: Types.ObjectId[];
	keywords: Types.ObjectId[];
}

export interface UpdateSeriesDTO {
	_id: Types.ObjectId;
	payload: CreateSeriesDTO;
}

export interface PublishSeriesDTO {
	_id: Types.ObjectId;
}

export interface DeleteSeriesDTO {
	_id: Types.ObjectId;
}

export interface deleteSeriesIfNotReferencedInOtherPostsDTO {
	series: [Types.ObjectId];
}

export interface AddOrRemoveTagFromSeriesDTO {
	seriesId: Types.ObjectId;
	tagId: Types.ObjectId;
}

export interface AddOrRemoveKeywordFromSeriesDTO {
	seriesId: Types.ObjectId;
	keywordId: Types.ObjectId;
}
