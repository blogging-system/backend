// import validate from "../../../../Shared/Helpers/validateInput";
// import tagValidators from "../Validators/tag.validators";

// import { handleHttpErrorResponse } from "../../../../Shared/Http";

// import { getAllTags_service, getLatestTags_service } from "../Services/tag.queries.service";

// import { deleteTag_service } from "../Services/tag.mutations.service";

// export default {
// 	Query: {
// 		getAllTags: async (parent, { data }) => {
// 			try {
// 				return await getAllTags_service();
// 			} catch (error) {
// 				return handleHttpErrorResponse(error);
// 			}
// 		},

// 		getLatestTags: async () => {
// 			try {
// 				return await getLatestTags_service();
// 			} catch (error) {
// 				return handleHttpErrorResponse(error);
// 			}
// 		},
// 	},
