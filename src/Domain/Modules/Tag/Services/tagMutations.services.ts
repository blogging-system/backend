import TagRepository from "./../Repository/tag.repository";
import { CreateTagDTO, DeleteTagDTO, UpdateTagDTO } from "../Types";
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

	public static async deleteTag(data: DeleteTagDTO) {
		/**
		 * TODO: check other model!
		 */

		// if no other documents have this it as a reference, then
		const { deletedCount } = await TagRepository.deleteOne({ _id: data._id });

		if (deletedCount === 0) throw new InternalServerException("The tag deletion process failed!");

		return "The tag is deleted successfully!";
	}
}
