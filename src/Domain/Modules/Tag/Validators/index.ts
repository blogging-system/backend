import { tagMutationsValidators } from "./tagMutations.validators";
import { tagQueriesValidators } from "./tagQueries.validators";

export default {
	...tagMutationsValidators,
	...tagQueriesValidators,
};
