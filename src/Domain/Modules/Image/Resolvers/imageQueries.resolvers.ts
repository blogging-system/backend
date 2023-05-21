import validateInput from "../../../../Shared/Helpers/validateInput";
import ImageServices from "../Services";
import { GetImageByIdDTO } from "../Types";
import ImageValidators from "./../Validators";

export const imageQueries = {
	getImageById: async (parent, args, context, info) => {
		const validatedData = await validateInput(ImageValidators.getImageById, args.data as GetImageByIdDTO);

		return await ImageServices.getImageById(validatedData);
	},
};
