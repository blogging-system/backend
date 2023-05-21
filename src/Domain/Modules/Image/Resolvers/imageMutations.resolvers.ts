import validateInput from "../../../../Shared/Helpers/validateInput";
import ImageValidators from "./../Validators";
import ImageServices from "../Services";
import { CreateImageDTO, UpdateImageDTO } from "../Types";

export const imageMutations = {
	createImage: async (parent, args, context, info) => {
		const validatedData = await validateInput(ImageValidators.createImage, args.data as CreateImageDTO);

		return await ImageServices.createImage(validatedData);
	},

	updateImage: async (parent, args, context, info) => {
		const validatedData = await validateInput(ImageValidators.updateImage, args.data as UpdateImageDTO);

		return await ImageServices.updateImage(validatedData);
	},
};
