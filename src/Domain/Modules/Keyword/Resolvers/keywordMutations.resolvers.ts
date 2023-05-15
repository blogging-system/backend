import validateInput from "../../../../Shared/Helpers/validateInput";
import KeywordValidators from "../Validators";
import KeywordServices from "../Services";
import { handleHttpSuccessResponse } from "../../../../Shared/Http";
import { CreateKeywordDTO, DeleteKeywordDTO, UpdateKeywordDTO } from "../Types";

export const keywordMutations = {
	createKeyword: async (parent, args, context, info) => {
		const validatedData = await validateInput(KeywordValidators.createKeyword, args.data as CreateKeywordDTO);

		return await KeywordServices.createKeyword(validatedData);
	},

	updateKeyword: async (parent, args, context, info) => {
		const validatedData = await validateInput(KeywordValidators.updateKeyword, args.data as UpdateKeywordDTO);

		return await KeywordServices.updateKeyword(validatedData);
	},

	deleteKeyword: async (parent, args, context, info) => {
		const validatedData = await validateInput(KeywordValidators.deleteKeyword, args.data as DeleteKeywordDTO);

		const message = await KeywordServices.deleteKeyword(validatedData);

		return handleHttpSuccessResponse("KEYWORD_DELETED", message);
	},
};
