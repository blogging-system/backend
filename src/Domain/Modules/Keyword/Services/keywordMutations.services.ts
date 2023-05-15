import KeywordRepository from "./../Repository/keyword.repository";
import { ForbiddenException, InternalServerException, NotFoundException } from "../../../../Shared/Exceptions";
import { CreateKeywordDTO } from "../Types";

export default class KeywordMutationsServices {
	public static async createKeyword(data: CreateKeywordDTO) {
		const createdKeyword = await KeywordRepository.createOne(data);

		if (!createdKeyword) throw new InternalServerException("The post creation failed!");

		return createdKeyword;
	}
}
