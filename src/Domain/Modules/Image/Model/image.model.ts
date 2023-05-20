import mongoose, { Schema } from "mongoose";

const ImageSchema = new Schema(
	{
		url: {
			type: String,
			unique: true,
		},
		altText: {
			// types: String, // for accessability purposes
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default mongoose.model("Image", ImageSchema);
