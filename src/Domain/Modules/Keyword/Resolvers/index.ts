import { keywordQueries } from "./keywordQueries.resolvers";
import { keywordMutations } from "./keywordMutations.resolvers";

export default {
	Query: keywordQueries,
	Mutation: keywordMutations,
};
