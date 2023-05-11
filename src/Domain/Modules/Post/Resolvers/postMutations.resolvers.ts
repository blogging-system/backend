import validateInput from "../../../../Shared/Helpers/validateInput";
import PostValidators from "../Validators";
import PostServices from "../Services";
import { CreatePostDTO } from "../Types";

export const postMutations = {
	createPost: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.create, args.data as CreatePostDTO);

		return await PostServices.create(validatedData);
	},

	updatePost: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.update, args.data);

		return await PostServices.update(validatedData);
	},

	deletePost: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.delete, args.data);

		return await PostServices.delete(validatedData);
	},

	publishPost: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.publish, args.data);

		return await PostServices.publish(validatedData);
	},
};
