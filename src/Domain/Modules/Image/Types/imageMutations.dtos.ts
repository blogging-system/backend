import { Types } from "mongoose";
export interface CreateImageDTO {
	url: string;
	altText: string;
}

export interface UpdateImageDTO {
	_id: Types.ObjectId;
	payload: CreateImageDTO;
}
