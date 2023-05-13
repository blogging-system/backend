import slugify from "slugify";
import mongoose, { Schema } from "mongoose";

const SeriesSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		slug: {
			type: String,
			default: function () {
				return slugify(this.title);
			},
			index: true,
		},
		description: {
			type: String,
		},
		posts: [
			{
				type: Schema.Types.ObjectId,
				ref: "Post",
			},
		],
		imageUrl: {
			type: String,
		},
		views: {
			type: Number,
			default: 0,
		},
		tags: [
			{
				type: Schema.Types.ObjectId,
				ref: "Tag",
			},
		],
		keywords: [
			{
				type: String,
			},
		],
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

SeriesSchema.pre("save", function (next) {
	next();
});

export default mongoose.model("Series", SeriesSchema);
