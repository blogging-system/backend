import TagRepository from "./../Repository/tag.repository";
import PostRepository from "../../Post/Repository/post.repository";
import { CreateTagDTO, DeleteTagDTO, DeleteUnusedTagsDTO, UpdateTagDTO } from "../Types";
import { ForbiddenException, InternalServerException, NotFoundException } from "../../../../Shared/Exceptions";

export default class TagMutationsServices {
	public static async createTag(data: CreateTagDTO) {
		const createdTag = await TagRepository.createOne(data);

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
		const tagReferencingPosts = await PostRepository.findMany({ tags: { $in: data._id } });

		if (tagReferencingPosts.length !== 0)
			throw new ForbiddenException("You need to delete the referencing posts first!");

		const { deletedCount } = await TagRepository.deleteOne({ _id: data._id });

		if (deletedCount === 0) throw new InternalServerException("The tag deletion process failed!");

		return "The tag is deleted successfully!";
	}

	public static async deleteUnusedTags(data: DeleteUnusedTagsDTO) {
		const deletePromises = data.tags.map(async (tag) => {
			const tagReferencingPosts = await PostRepository.findMany({ tags: { $in: tag._id } });

			if (tagReferencingPosts.length === 0) {
				await TagRepository.deleteOne({ _id: tag._id });
			}
		});

		await Promise.all(deletePromises);
	}
}
