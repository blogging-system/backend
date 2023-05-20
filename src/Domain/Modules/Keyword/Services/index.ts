import {
	CreateKeywordDTO,
	DeleteKeywordDTO,
	DeleteUnusedKeywordsDTO,
	GetAllKeywordsDTO,
	SuggestKeywordByNameDTO,
	UpdateKeywordDTO,
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

	public static async deleteUnusedKeywords(data: DeleteUnusedKeywordsDTO) {
		return await KeywordMutationsServices.deleteUnusedKeywords(data);
	}

	public static async suggestKeywordByName(data: SuggestKeywordByNameDTO) {
		return await KeywordQueriesServices.suggestKeywordByName(data);
	}

	public static async getAllKeywords(data: GetAllKeywordsDTO) {
		return await KeywordQueriesServices.getAllKeywords(data);
	}
}
