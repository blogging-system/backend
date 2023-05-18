import { seriesMutationsValidators } from "./seriesMutations.validators";
import { seriesQueriesValidators } from "./seriesQueries.validators";

export default {
	...seriesMutationsValidators,
	...seriesQueriesValidators,
};
