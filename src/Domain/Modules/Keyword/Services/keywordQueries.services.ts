import { Types } from "mongoose";
import { NotFoundException } from "../../../../Shared/Exceptions";
import { GetAllKeywordsDTO, SuggestKeywordByNameDTO } from "../Types";
import KeywordRepository from "../Repository/keyword.repository";
export default class KeywordQueriesServices {
	public static async suggestKeywordByName(data: SuggestKeywordByNameDTO) {
		const matchedKeywords = await KeywordRepository.findMany(
			{ name: { $regex: data.name, $options: "i" } },
			data.limit
		);

		if (matchedKeywords.length === 0) throw new NotFoundException("No matched tags found!");

		return matchedKeywords;
	}

	public static async getAllKeywords(data: GetAllKeywordsDTO) {
		const { pageSize, pageNumber, sort } = data;

		const matchedKeywords = await KeywordRepository.aggregate([
			{ $sort: { createdAt: sort } },
			{ $skip: pageSize * (pageNumber - 1) },
			{ $limit: pageSize },
		]);

		if (matchedKeywords.length == 0) throw new NotFoundException("No Keywords found!");

		return matchedKeywords;
	}
}
