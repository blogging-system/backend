import validateInput from "../../../../Shared/Helpers/validateInput";
import PostValidators from "../Validators";
import PostServices from "../Services";
import { CreatePostDTO, DeletePostDTO, PublishPostDTO, UpdatePostDTO } from "../Types";
import { handleHttpSuccessResponse } from "../../../../Shared/Http";

export const postMutations = {
	createPost: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.create, args.data as CreatePostDTO);

		return await PostServices.createPost(validatedData);
	},

	updatePost: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.update, args.data as UpdatePostDTO);

		return await PostServices.updatePost(validatedData);
	},

	deletePost: async (parent, args, context, info) => {
		const { _id } = await validateInput(PostValidators.delete, args.data as DeletePostDTO);

		const message = await PostServices.deletePost(_id);

		return handleHttpSuccessResponse("POST_DELETED_SUCCESSFULLY", message);
	},

	publishPost: async (parent, args, context, info) => {
		const validatedData = await validateInput(PostValidators.publish, args.data as PublishPostDTO);

		const message = await PostServices.publishPost(validatedData);

		return handleHttpSuccessResponse("POST_PUBLISHED_SUCCESSFULLY", message);
	},
};
