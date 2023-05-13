import { CreateTagDTO } from "../Types";
import TagMutationsServices from "./tagMutations.services";

export default class TagServices {
	public static async createTag(data: CreateTagDTO) {
		return await TagMutationsServices.createTag(data);
	}
}
