import { NotFoundException } from "../../../../Shared/Exceptions";
import TagRepository from "../Repository/tag.repository";
import { SuggestTagByNameDTO } from "../Types";

export default class TagQueriesServices {
	public static async suggestTagByName(data: SuggestTagByNameDTO) {
		const matchedTags = await TagRepository.findMany({ name: { $regex: data.name, $options: "i" } }, data.limit);

		if (matchedTags.length === 0) throw new NotFoundException("No matched tags found!");

		return matchedTags;
	}

    
}
