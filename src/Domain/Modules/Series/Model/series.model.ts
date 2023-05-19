import mongoose, { Schema } from "mongoose";

const SeriesSchema = new Schema(
	{
		title: {
			type: String,
			unique: true,
		},
		slug: {
			type: String,
			index: true,
		},
		description: {
			type: String,
		},

		image: { type: Schema.Types.ObjectId, ref: "Image" },

		isPublished: {
			type: Boolean,
			default: false,
			index: true,
		},
		isPublishedAt: Date,
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default mongoose.model("Series", SeriesSchema);
