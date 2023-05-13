import validateInput from "../../../../Shared/Helpers/validateInput";
import TagValidators from "../Validators";
import TagServices from "../Services";
import { CreateTagDTO } from "../Types";
// import { handleHttpSuccessResponse } from "../../../../Shared/Http";

export const tagMutations = {
	createTag: async (parent, args, context, info) => {
		const validatedData = await validateInput(TagValidators.createTag, args.data as CreateTagDTO);
		//
		return await TagServices.createTag(validatedData);
	},
};
