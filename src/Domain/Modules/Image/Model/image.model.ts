import mongoose, { Schema } from "mongoose";

const ImageSchema = new Schema(
	{
		title: {
			type: String,
			unique: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default mongoose.model("Image", ImageSchema);
