import { CreateKeywordDTO, DeleteKeywordDTO, UpdateKeywordDTO } from "../Types";
import KeywordMutationsServices from "./keywordMutations.services";
import KeywordQueriesServices from "./keywordQueries.services";

export default class PostServices {
	public static async createKeyword(data: CreateKeywordDTO) {
		return await KeywordMutationsServices.createKeyword(data);
	}

	public static async updateKeyword(data: UpdateKeywordDTO) {
		return await KeywordMutationsServices.updateKeyword(data);
	}

	public static async deleteKeyword(data: DeleteKeywordDTO) {
		return await KeywordMutationsServices.deleteKeyword(data);
	}
}
