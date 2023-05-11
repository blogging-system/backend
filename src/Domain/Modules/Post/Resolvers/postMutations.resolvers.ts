import validateInput from "../../../../shared/Helpers/validateInput";
import PostValidators from "../Validators/post.validators";
import PostServices from "../Services";

export const postMutations = {
	createPost: async (parent, args, context, info) => {
		const validatedData = await validateInput(postValidators.create, args.data);

		return await PostServices.create(validatedData);
	},

	updatePost: async (parent, args, context, info) => {
		const validatedData = await validateInput(postValidators.update, args.data);

		return await PostServices.update(validatedData);
	},

	deletePost: async (parent, args, context, info) => {
		const validatedData = await validateInput(postValidators.delete, args.data);

		return await PostServices.delete(validatedData);
	},

	publishPost: async (parent, args, context, info) => {
		const validatedData = await validateInput(postValidators.publish, args.data);

		return await PostServices.publish(validatedData);
	},
};
