import { NotFoundException } from "../../../../Shared/Exceptions";
import SeriesRepository from "../Repository/series.repository";
import { GetSeriesBySlugDTO, SuggestSeriesByTitleDTO } from "../Types/seriesQueries.dtos";

export default class SeriesQueriesServices {
	public static async suggestSeriesByTitle(data: SuggestSeriesByTitleDTO) {
		const matchedSeries = await SeriesRepository.aggregate([
			{
				$search: {
					index: "suggestSeriesByTitle",
					text: {
						query: data.title,
						path: {
							wildcard: "*",
						},
					},
				},
			},
			{ $limit: 5 },
			{ $project: { title: 1, slug: 1 } },
		]);

		if (matchedSeries.length < 1) throw new NotFoundException("Not matched series found!");

		return matchedSeries;
	}

	public static async getSeriesBySlug(data: GetSeriesBySlugDTO) {
		const matchedSeries = await SeriesRepository.findOne({ slug: data.slug });

		if (!matchedSeries) throw new NotFoundException("The series is not found!");

		return matchedSeries;
	}
}
