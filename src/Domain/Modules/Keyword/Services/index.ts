import {
	CreateKeywordDTO,
	DeleteKeywordDTO,
	GetAllKeywordsDTO,
	SuggestKeywordByNameDTO,
	UpdateKeywordDTO,
	deleteKeywordsIfNotReferencedInOtherPostsOrSeriesDTO,
} from "../Types";
import KeywordMutationsServices from "./keywordMutations.services";
import KeywordQueriesServices from "./keywordQueries.services";

export default class KeywordServices {
	public static async createKeyword(data: CreateKeywordDTO) {
		return await KeywordMutationsServices.createKeyword(data);
	}

	public static async updateKeyword(data: UpdateKeywordDTO) {
		return await KeywordMutationsServices.updateKeyword(data);
	}

	public static async deleteKeyword(data: DeleteKeywordDTO) {
		return await KeywordMutationsServices.deleteKeyword(data);
	}

	public static async suggestKeywordByName(data: SuggestKeywordByNameDTO) {
		return await KeywordQueriesServices.suggestKeywordByName(data);
	}

	public static async getAllKeywords(data: GetAllKeywordsDTO) {
		return await KeywordQueriesServices.getAllKeywords(data);
	}

	public static async deleteKeywordsIfNotReferencedInOtherPostsOrSeries(
		data: deleteKeywordsIfNotReferencedInOtherPostsOrSeriesDTO
	) {
		return await KeywordMutationsServices.deleteKeywordsIfNotReferencedInOtherPostsOrSeries(data);
	}
}
