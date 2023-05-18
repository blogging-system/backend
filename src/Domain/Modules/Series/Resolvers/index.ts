import { seriesQueriesResolvers } from "./seriesQueries.resolvers";
import { seriesMutationsResolvers } from "./seriesMutations.resolvers";

export default {
	Query: seriesQueriesResolvers,
	Mutation: seriesMutationsResolvers,
};
