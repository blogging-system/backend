import slugify from "slugify";
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
			default: function () {
				return slugify(this.title);
			},
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

// Our mongoose hooks/ middlewares
PostSchema.pre("save", async function (next) {
	// If title is not modified, then move forward!
	if (!this.isModified("title")) return next();

	this.slug = slugify(this.title);
	next();
});

export default mongoose.model("Post", PostSchema);
