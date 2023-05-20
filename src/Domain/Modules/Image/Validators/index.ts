import { imageQueriesValidators } from "./imageQueries.validators";
import { imageMutationsValidators } from "./imageMutations.validators";

export default {
	...imageQueriesValidators,
	...imageMutationsValidators,
};
