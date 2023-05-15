import validateInput from "../../../../Shared/Helpers/validateInput";
import KeywordValidators from "../Validators";
import KeywordServices from "../Services";
import { handleHttpSuccessResponse } from "../../../../Shared/Http";
import { CreateKeywordDTO } from "../Types";

export const keywordMutations = {
	createKeyword: async (parent, args, context, info) => {
		const validatedData = await validateInput(KeywordValidators.createKeyword, args.data as CreateKeywordDTO);

		return await KeywordServices.createKeyword(validatedData);
	},
};
