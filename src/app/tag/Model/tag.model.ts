import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const TagSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			unique: true,
			index: true,
			required: true,
		},

		slug: {
			type: String,
			default: function () {
				return slugify(this.name);
			},
			index: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
		autoCreate: true,
	}
);

export default mongoose.model("Tag", TagSchema);
