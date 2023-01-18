import { GraphQLError } from "graphql";
import Series from "../Model/series.model";

export const getAllSeries_service = async (data) => {
	// (1) Let's intialize series variable
	let series = [];

	// (2) Get series from DB and sort them to return latest published

	// Scenario 1 => If lastSeriesId not provided, then find the first N series from DB
	if (!data.lastSeriesId) {
		series = await Series.find({ is_published: true }) // First page
			.sort({ publishedAt: -1 }) // sort by latest published
			.limit(data.limit)
			.select("title slug description imageUrl tags publishedAt")
			.populate({ path: "tags" })
			.lean();
	}

	// Scenario 2 => If lastSeriesid was provided, then do pagination!1
	if (data.lastSeriesId) {
		// (1) Get publish date of the provided series document
		const seriesProvided = await Series.findOne({ _id: data.lastSeriesId })
			.select("publishedAt")
			.lean();

		// (2) Find the next N series published after the provied series document
		series = await Series.find({
			is_published: true,
			publishedAt: { $lt: new Date(seriesProvided.publishedAt) },
		}) // Next pages
			.sort({ publishedAt: -1 })
			.limit(data.limit)
			.select("title slug description imageUrl tags publishedAt")
			.populate({ path: "tags" })
			.lean();
	}

	// If No series found
	if (series.length == 0) {
		return new GraphQLError("No Series Found", {
			extensions: { http: { status: 404 } },
		});
	}

	// (3) Return the found series
	return series;
};

export const getSeriesBySlug_service = async (data) => {
	// (1) Get series
	const series = await Series.findOne({ slug: data.slug })
		.select("-is_published -createdAt -updatedAt -views")
		.populate({
			path: "posts",
			select: "slug description imageUrl publishedAt",
		})
		.lean();

	// If not found
	if (!series) {
		return new GraphQLError("Seris Not Found", {
			extensions: { http: { status: 404 } },
		});
	}

	// (2) Return series
	return series;
};
