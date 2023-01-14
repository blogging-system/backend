import mongoose, { Schema } from "mongoose";

const SeriesSchema = new Schema(
	{
		name: {
			type: String,
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
