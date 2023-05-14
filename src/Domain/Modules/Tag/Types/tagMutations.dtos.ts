import { Types } from "mongoose";
export interface CreateTagDTO {
	name: string;
}

export interface UpdateTagDTO {
	_id: Types.ObjectId;
	name: string;
}
