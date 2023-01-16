import slugify from "slugify";
import mongoose, { Schema } from "mongoose";
import { printSchema } from "graphql";

const PostSchema = new Schema(
	{
		seriesId: { type: Schema.Types.ObjectId, ref: "Series" },
		title: {
			type: String,
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
		content: {
			type: String,
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
		autoCreate: true,
	}
);

// Our mongoose hooks/ middlewares
PostSchema.pre("save", async function (next) {
	// If title is not modified, then move forward!
	if (!this.isModified("title")) return next();

	this.slug = slugify(this.title);
	next();
});

export default mongoose.model("Post", PostSchema);
