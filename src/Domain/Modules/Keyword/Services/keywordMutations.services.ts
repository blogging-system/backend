import KeywordRepository from "./../Repository/keyword.repository";
import PostRepository from "../../Post/Repository/post.repository";
import { ForbiddenException, InternalServerException, NotFoundException } from "../../../../Shared/Exceptions";
import { CreateKeywordDTO, DeleteKeywordDTO, DeleteUnusedKeywordsDTO, UpdateKeywordDTO } from "../Types";

export default class KeywordMutationsServices {
	public static async createKeyword(data: CreateKeywordDTO) {
		const createdKeyword = await KeywordRepository.createOne(data);

		if (!createdKeyword) throw new InternalServerException("The post creation failed!");

		return createdKeyword;
	}

	public static async updateKeyword(data: UpdateKeywordDTO) {
		const updatedKeyword = await KeywordRepository.updateOne({ _id: data._id }, { name: data.name });

		if (updatedKeyword.matchedCount === 0) throw new NotFoundException("The keyword is not found!");
		if (updatedKeyword.modifiedCount === 0) throw new InternalServerException("The keyword update process failed!");

		return updatedKeyword;
	}

	public static async deleteKeyword(data: DeleteKeywordDTO) {
		const keywordReferencingPosts = await PostRepository.findMany({ keywords: { $in: data._id } });

		if (keywordReferencingPosts.length !== 0)
			throw new ForbiddenException("You need to delete the referencing posts first!");

		const { deletedCount } = await KeywordRepository.deleteOne({ _id: data._id });

		if (deletedCount === 0) throw new InternalServerException("The keyword deletion process failed!");

		return "The keyword is deleted successfully!";
	}

	public static async deleteUnusedKeywords(data: DeleteUnusedKeywordsDTO) {
		const deletePromises = data.keywords.map(async (keyword) => {
			const keywordReferencingPosts = await PostRepository.findMany({ keywords: { $in: keyword._id } });

			if (keywordReferencingPosts.length === 0) {
				await KeywordRepository.deleteOne({ _id: keyword._id });
			}
		});

		await Promise.all(deletePromises);
	}
}
