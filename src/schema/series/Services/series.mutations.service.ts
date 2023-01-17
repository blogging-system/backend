import { date } from "joi";
import Series from "../Model/series.model";
import { GraphQLError } from "graphql";

export const createSeries_service = async (data) => {
	// (1) Create series
	const series = new Series({ ...data });

	// (2) Save series
	await series.save();

	// (3) Return series
	return series;
};

export const deleteSeries_service = async (data) => {
	// (1) Get series from DB
	const series = await Series.findOne({ _id: data.seriesId })
		.select("_id posts")
		.lean();

	// If not found
	if (!series) {
		return new GraphQLError("Series Not Found", {
			extensions: { http: { status: 404 } },
		});
	}

	// If series has posts
	if (series.posts.length >= 1) {
		return new GraphQLError(
			"Sorry, You need to remove all associated posts first.",
			{
				extensions: { http: { status: 400 } },
			}
		);
	}

	// (2) Delete series
	await Series.deleteOne({ _id: data.seriesId });

	return {
		success: true,
		message: "Series is deleted successfully",
	};
};
