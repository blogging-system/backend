import mongoose, { Schema } from "mongoose";

const ViewsTrackerSchema = new Schema(
	{
		target: {
			type: Schema.Types.ObjectId,
			refPath: "targetType",
		},
		targetType: {
			type: String,
			required: true,
			enum: ["Post", "Series"],
		},
		viewsCount: {
			type: Number,
			default: 1,
		},
		viewedAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default mongoose.model("ViewsTracker", ViewsTrackerSchema);
