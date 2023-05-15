import TagValidators from "../Validators";
import validateInput from "../../../../Shared/Helpers/validateInput";
import { GetAllTagsDTO, GetTagBySlugDTO, SuggestTagByNameDTO } from "../Types";
import TagServices from "../Services";

export const tagQueries = {
	suggestTagByName: async (parent, args, context, info) => {
		const validatedData = await validateInput(TagValidators.suggestTagByName, args.data as SuggestTagByNameDTO);

		return await TagServices.suggestTagByName(validatedData);
	},

	getTagBySlug: async (parent, args, context, info) => {
		const validatedData = await validateInput(TagValidators.getTagBySlug, args.data as GetTagBySlugDTO);

		return await TagServices.getTagBySlug(validatedData);
	},

	getAllTags: async (parent, args, context, info) => {
		const validatedData = await validateInput(TagValidators.getAllTags, args.data as GetAllTagsDTO);

		return await TagServices.getAllTags(validatedData);
	},
};
