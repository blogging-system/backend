import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const TagSchema = new Schema(
	{
		name: {
			type: String,
			unique: true,
		},
		slug: {
			type: String,
			index: true,
			default: function () {
				return slugify(this.name);
			},
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default mongoose.model("Tag", TagSchema);
