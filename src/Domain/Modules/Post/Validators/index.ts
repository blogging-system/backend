import { postQueriesValidators } from "./postQueries.validators";
import { postMutationsValidators } from "./postMutations.validators";

export default {
	...postQueriesValidators,
	...postMutationsValidators,
};
