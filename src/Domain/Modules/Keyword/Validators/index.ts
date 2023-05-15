import { keywordQueriesValidators } from "./keywordQueries.validators";
import { keywordMutationsValidators } from "./keywordMutations.validators";

export default {
	...keywordQueriesValidators,
	...keywordMutationsValidators,
};
