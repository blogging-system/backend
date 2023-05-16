import { Types } from "mongoose";
export interface CreateSeriesDTO {
	title: string;
	description: string;
	image: Types.ObjectId;
	tags: Types.ObjectId[];
	keywords: Types.ObjectId[];
}
