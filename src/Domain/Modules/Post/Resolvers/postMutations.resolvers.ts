import { ForbiddenException, UnAuthorizedException } from "../../../../shared/Exceptions";
import validateInput from "../../../../shared/Helpers/validateInput";
import postValidators from "../Validators/post.validators";

import {
	createPost_service,
	updatePost_service,
	deletePost_service,
	publishPost_service,
} from "./../Services/post.mutations.service";

export const Mutation = {
	createPost: async (parent, { data }) => {
		// throw new ForbiddenException("fuck you!");

		// throw new UnAuthorizedException("fuck you!");
		const validatedData = await validateInput(postValidators.create, data);
		console.log({ validatedData });
		return await createPost_service(validatedData);
	},

	updatePost: async (parent, { data }) => {
		const validatedData = await validateInput(postValidators.update, data);

		return await updatePost_service(validatedData);
	},

	deletePost: async (parent, { data }) => {
		const validatedData = await validateInput(postValidators.delete, data);

		return await deletePost_service(validatedData);
	},

	publishPost: async (parent, { data }) => {
		const validatedData = await validateInput(postValidators.publish, data);

		return await publishPost_service(validatedData);
	},
};
