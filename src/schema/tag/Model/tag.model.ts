import mongoose, { Schema } from "mongoose";

const TagSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			unique: true,
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default mongoose.model("Tag", TagSchema);
