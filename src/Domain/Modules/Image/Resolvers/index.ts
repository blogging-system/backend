import { imageQueries } from "./imageQueries.resolvers";
import { imageMutations } from "./imageMutations.resolvers";

export default {
	Query: imageQueries,
	Mutation: imageMutations,
};
