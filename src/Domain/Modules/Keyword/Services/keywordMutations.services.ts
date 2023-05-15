import KeywordRepository from "./../Repository/keyword.repository";
import { ForbiddenException, InternalServerException, NotFoundException } from "../../../../Shared/Exceptions";
import { CreateKeywordDTO, UpdateKeywordDTO } from "../Types";

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
}
