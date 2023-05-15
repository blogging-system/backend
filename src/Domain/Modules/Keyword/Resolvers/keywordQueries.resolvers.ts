import validateInput from "../../../../Shared/Helpers/validateInput";
import KeywordValidators from "../Validators";

import KeywordServices from "../Services";
import { SuggestKeywordByNameDTO } from "../Types";

export const keywordQueries = {
	suggestKeywordByName: async (parent, args, context, info) => {
		const validatedData = await validateInput(
			KeywordValidators.suggestKeywordByName,
			args.data as SuggestKeywordByNameDTO
		);

		return await KeywordServices.suggestKeywordByName(validatedData);
	},
};
