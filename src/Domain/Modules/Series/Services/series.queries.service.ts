import { GraphQLError } from "graphql";
import Series from "../Model/series.model";

export const getAllSeries_service = async (data) => {
	const pageNumber = data.page;
	const limit = 8;
	let series = [];

	const skip = pageNumber == 1 ? 0 : (pageNumber - 1) * limit;

	// (1) Get series fom DB
	if (data.page) {
		series = await Series.find({ isPublished: true })
			.sort({ publishedAt: -1 }) // sort by latest published
			.skip(skip)
			.limit(limit)
			.select("title slug description imageUrl tags publishedAt")
			.populate({ path: "tags" })
			.populate({
				path: "posts",
				select: "_id slug title imageUrl",
			})
			.lean();
	} else {
		series = await Series.find({ isPublished: true })
			.sort({ publishedAt: -1 }) // sort by latest published
			.select("title slug description imageUrl tags publishedAt")
			.populate({ path: "tags" })
			.populate({
				path: "posts",
				select: "_id slug title imageUrl",
			})
			.lean();
	}

	// If No series found
	if (series.length == 0) {
		return new GraphQLError("No Series Found", {
			extensions: { http: { status: 404 } },
		});
	}

	const count = await Series.find({ isPublished: true }).select("_id").lean();

	// (2) Return the found series
	return { series, totalCount: count.length };
};

export const getSeriesBySlug_service = async (data) => {
	// Let's make every page contains only 8 docs maximium
	const limit = 8;

	// (1) Get series
	const series = await Series.findOne({ slug: data.slug, isPublished: true })
		.select("-isPublished -createdAt -updatedAt -views")
		.populate({
			path: "posts",
			select: "_id slug title imageUrl",
		})
		.lean();

	// If not found
	if (!series) {
		return new GraphQLError("Series Not Found", {
			extensions: { http: { status: 404 } },
		});
	}

	const count = series.posts.length;

	// If given page is larger than our numbers
	if (data.page != 1 && data.page > Math.ceil(count / limit)) {
		return new GraphQLError("No More Posts", {
			extensions: { http: { status: 404 } },
		});
	}

	// (2) Sort them so the latest added be on the top of the array
	series.posts = series.posts
		.reverse()
		.slice((data.page - 1) * limit, data.page * limit);

	// (3) Return series document
	return { series, totalCount: count };
};

export const getSeriesByTitle_service = async (data) => {
	// (1) Let's find those docs that match this query!
	const series = await Series.aggregate([
		{
			$search: {
				autocomplete: {
					query: data.title,
					path: "title",
					fuzzy: { maxEdits: 2 },
				},
			},
		},
		{ $limit: 3 },
		{ $project: { title: 1, slug: 1 } },
	]);

	// If nothing matches
	if (series.length < 1) {
		return new GraphQLError("No Series Found", {
			extensions: { http: { status: 404 } },
		});
	}

	// (2) Return matched posts
	return series;
};
