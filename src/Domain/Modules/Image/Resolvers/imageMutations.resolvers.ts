import validateInput from "../../../../Shared/Helpers/validateInput";
import ImageValidators from "./../Validators";
import ImageServices from "../Services";
import { CreateImageDTO, DeleteImageDTO, UpdateImageDTO } from "../Types";
import { handleHttpSuccessResponse } from "../../../../Shared/Http";

export const imageMutations = {
	createImage: async (parent, args, context, info) => {
		const validatedData = await validateInput(ImageValidators.createImage, args.data as CreateImageDTO);

		return await ImageServices.createImage(validatedData);
	},

	updateImage: async (parent, args, context, info) => {
		const validatedData = await validateInput(ImageValidators.updateImage, args.data as UpdateImageDTO);

		return await ImageServices.updateImage(validatedData);
	},

	deleteImage: async (parent, args, context, info) => {
		const validatedData = await validateInput(ImageValidators.deleteImage, args.data as DeleteImageDTO);

		const message = await ImageServices.deleteImage(validatedData);

		return handleHttpSuccessResponse("IMAGE_DELETED", message);
	},
};
