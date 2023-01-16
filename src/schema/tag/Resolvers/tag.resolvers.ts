import validate from "../../../helpers/validate";
import tagValidators from "../Validators/tag.validators";

import failure from "../../../helpers/handleFailure";

import {
	getAllTags_service,
	getPopularTags_service,
	getLatestTags_service,
} from "../Services/tag.queries.service";

import { deleteTag_service } from "../Services/tag.mutations.service";

export default {
	Query: {
		getAllTags: async () => {
			try {
				return await getAllTags_service();
			} catch (error) {
				return failure(error);
			}
		},

		getPopularTags: async (parent, { data }) => {
			try {
				// (1) Validatte commin data
				const validatedData = await validate(
					tagValidators.getPopularTags,
					data
				);

				// (2) Find popular posts and return them
				return await getPopularTags_service(validatedData);
			} catch (error) {
				return failure(error);
			}
		},

		getLatestTags: async (parent, { data }) => {
			try {
				return await getLatestTags_service();
			} catch (error) {
				return failure(error);
			}
		},
	},

	Mutation: {
		deleteTag: async (parent, { data }) => {
			try {
				// (1) Validate comming data
				const validatedData = await validate(tagValidators.deleteTag, data);

				// (2) Delete Tag and return message
				return await deleteTag_service(validatedData);
			} catch (error) {
				return failure(error);
			}
		},
	},
};
