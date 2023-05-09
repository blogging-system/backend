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
		publishedAt: Date,
		is_published: {
			type: Boolean,
			default: false,
			index: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

SeriesSchema.pre("save", function (next) {
	// console.log("hi form mogoose middleware....");
	next();
});

export default mongoose.model("Series", SeriesSchema);
