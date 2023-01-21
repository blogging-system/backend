import { GraphQLError } from "graphql";
import Series from "../Model/series.model";

export const getAllSeries_service = async (data) => {
	const pageNumber = data.page;
	const limit = 6;
	let series = [];

	const skip = pageNumber == 1 ? 0 : (pageNumber - 1) * limit;

	// (1) Get series fom DB
	if (data.page) {
		series = await Series.find({ is_published: true })
			.sort({ publishedAt: -1 }) // sort by latest published
			.skip(skip)
			.limit(limit)
			.select("title slug description imageUrl tags publishedAt")
			.populate({ path: "tags" })
			.lean();
	} else {
		series = await Series.find({ is_published: true })
			.sort({ publishedAt: -1 }) // sort by latest published
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

	const count = await Series.find({ is_published: true }).select("_id").lean();

	// (2) Return the found series
	return { series, totalCount: count.length };
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
