import { Types } from "mongoose";
export interface CreateKeywordDTO {
	name: string;
}

export interface UpdateKeywordDTO {
	_id: Types.ObjectId;
	name: string;
}
