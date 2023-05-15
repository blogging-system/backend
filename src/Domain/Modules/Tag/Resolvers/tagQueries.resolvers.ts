import TagValidators from "../Validators";
import validateInput from "../../../../Shared/Helpers/validateInput";
import { GetTagBySlugDTO, SuggestTagByNameDTO } from "../Types";
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
};
