import { CreateTagDTO, DeleteTagDTO, GetTagBySlugDTO, SuggestTagByNameDTO, UpdateTagDTO } from "../Types";
import TagMutationsServices from "./tagMutations.services";
import TagQueriesServices from "./tagQueries.services";
export default class TagServices {
	public static async createTag(data: CreateTagDTO) {
		return await TagMutationsServices.createTag(data);
	}

	public static async updateTag(data: UpdateTagDTO) {
		return await TagMutationsServices.updateTag(data);
	}

	public static async deleteTag(data: DeleteTagDTO) {
		return await TagMutationsServices.deleteTag(data);
	}

	public static async suggestTagByName(data: SuggestTagByNameDTO) {
		return await TagQueriesServices.suggestTagByName(data);
	}

	public static async getTagBySlug(data: GetTagBySlugDTO) {
		return await TagQueriesServices.getTagBySlug(data);
	}
}
