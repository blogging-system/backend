import mongoose, { Schema } from "mongoose";

const TagSchema = new Schema(
	{
		name: {
			type: String,
			unique: true,
		},
		slug: {
			type: String,
			index: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default mongoose.model("Tag", TagSchema);
