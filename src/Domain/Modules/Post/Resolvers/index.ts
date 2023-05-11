import { postQueries } from "./postQueries.resolvers";
import { postMutations } from "./postMutations.resolvers";

export default {
	Query: postQueries,
	Mutation: postMutations,
};
