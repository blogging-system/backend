import { Types } from "mongoose";
import { NotFoundException } from "../../../../Shared/Exceptions";
import { SuggestKeywordByNameDTO } from "../Types";
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
}
