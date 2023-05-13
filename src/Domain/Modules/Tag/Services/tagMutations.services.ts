import TagRepository from "./../Repository/tag.repository";
import { CreateTagDTO } from "../Types";
import { InternalServerException } from "../../../../Shared/Exceptions";

export default class TagMutationsServices {
	public static async createTag(data: CreateTagDTO) {
		const createdTag = await TagRepository.createOne({ ...data });

		if (!createdTag) throw new InternalServerException("The Tag creation failed!");

		return createdTag;
	}
}
