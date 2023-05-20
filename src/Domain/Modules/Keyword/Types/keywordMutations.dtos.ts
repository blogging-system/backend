import { Types } from "mongoose";
export interface CreateKeywordDTO {
	name: string;
}

export interface UpdateKeywordDTO {
	_id: Types.ObjectId;
	name: string;
}

export interface DeleteKeywordDTO {
	_id: Types.ObjectId;
}

export interface DeleteUnusedKeywordsDTO {
	keywords: [Types.ObjectId];
}
