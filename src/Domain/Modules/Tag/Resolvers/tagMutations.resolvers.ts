import validateInput from "../../../../Shared/Helpers/validateInput";
import TagValidators from "../Validators";
import TagServices from "../Services";
import { CreateTagDTO, UpdateTagDTO } from "../Types";
// import { handleHttpSuccessResponse } from "../../../../Shared/Http";

export const tagMutations = {
	createTag: async (parent, args, context, info) => {
		const validatedData = await validateInput(TagValidators.createTag, args.data as CreateTagDTO);
		//
		return await TagServices.createTag(validatedData);
	},

	updateTag: async (parent, args, context, info) => {
		const validatedData = await validateInput(TagValidators.updateTag, args.data as UpdateTagDTO);

		return await TagServices.updateTag(validatedData);
	},
};
