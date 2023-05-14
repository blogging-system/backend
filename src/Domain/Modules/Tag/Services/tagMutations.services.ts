import TagRepository from "./../Repository/tag.repository";
import { CreateTagDTO, UpdateTagDTO } from "../Types";
import { InternalServerException, NotFoundException } from "../../../../Shared/Exceptions";

export default class TagMutationsServices {
	public static async createTag(data: CreateTagDTO) {
		const createdTag = await TagRepository.createOne({ ...data });

		if (!createdTag) throw new InternalServerException("The Tag creation failed!");

		return createdTag;
	}

	public static async updateTag(data: UpdateTagDTO) {
		const updatedTag = await TagRepository.updateOne({ _id: data._id }, { name: data.name });

		if (updatedTag.matchedCount === 0) throw new NotFoundException("The tag is not found!");
		if (updatedTag.modifiedCount === 0) throw new InternalServerException("The tag update process failed");

		return updatedTag;
	}
}
