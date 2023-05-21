import { Types } from "mongoose";

export interface IncrementDTO {
	target: Types.ObjectId;
	targetType: string;
}
