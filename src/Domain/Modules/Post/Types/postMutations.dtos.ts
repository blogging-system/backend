import { Types } from "mongoose";

export interface CreatePostDTO {
	title: string;
	description: string;
	content: string;
	imageId: Types.ObjectId;
	tags: Types.ObjectId[];
	series: Types.ObjectId[];
	keywords: Types.ObjectId[];
}

export interface UpdatePostDTO {
	_id: Types.ObjectId;
	payload: CreatePostDTO;
}

export interface DeletePostDTO {
	_id: Types.ObjectId;
}

export interface PublishPostDTO {
	_id: Types.ObjectId;
}
