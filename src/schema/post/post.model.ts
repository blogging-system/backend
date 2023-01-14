import slugify from "slugify";
import { ObjectId } from "bson";
import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
	{
		seriesId: { type: Schema.Types.ObjectId },
		authorId: {
			type: Schema.Types.ObjectId,
			default: function () {
				return new ObjectId("63b9199463e4ca3f54005305");
			},
		},
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
			trim: true,
		},
		content: {
			type: String,
			trim: true,
		},

		tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
		keywords: [
			{
				type: String,
			},
		],
		views: {
			type: Number,
			default: 0,
		},
		imageUrl: {
			type: String,
			trim: true,
		},
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

PostSchema.pre("save", function (next) {
	// console.log("hi form mogoose middleware....");
	next();
});

export default mongoose.model("Post", PostSchema);
