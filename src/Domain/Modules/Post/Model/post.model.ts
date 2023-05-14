import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
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
		content: {
			type: String,
		},

		imageId: { type: Schema.Types.ObjectId, ref: "Image" },
		tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
		series: [{ type: Schema.Types.ObjectId, ref: "Series" }],
		keywords: [{ type: Schema.Types.ObjectId, ref: "Keyword" }],

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
		autoCreate: true,
	}
);

export default mongoose.model("Post", PostSchema);
