import mongoose, { Schema } from "mongoose";

const KeywordSchema = new Schema(
	{
		name: {
			type: String,
			unique: true,
			index: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

KeywordSchema.index({ name: "text" });

export default mongoose.model("Keyword", KeywordSchema);
