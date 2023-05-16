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
