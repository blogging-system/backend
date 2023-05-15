import mongoose, { Schema } from "mongoose";

const TagSchema = new Schema(
	{
		name: {
			type: String,
			unique: true,
			index: true,
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

TagSchema.index({ name: "text" });

export default mongoose.model("Tag", TagSchema);
