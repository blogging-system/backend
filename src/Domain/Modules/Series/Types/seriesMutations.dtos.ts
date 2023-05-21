import { Types } from "mongoose";
export interface CreateSeriesDTO {
	title: string;
	description: string;
	image: Types.ObjectId;
}

export interface UpdateSeriesDTO {
	_id: Types.ObjectId;
	payload: CreateSeriesDTO;
}

export interface DeleteSeriesDTO {
	_id: Types.ObjectId;
}

export interface DeleteUnusedSeriesDTO {
	series: [Types.ObjectId];
}
