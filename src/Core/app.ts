import { createYoga } from "graphql-yoga";
import { GraphQLError } from "graphql";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import { makeExecutableSchema } from "@graphql-tools/schema";

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

const yoga = createYoga({
	schema,
	landingPage: false,
	graphqlEndpoint: "/",
	logging: true,
	maskedErrors: {
		maskError(error: GraphQLError) {
			return {
				name: error.message,
				status: error.extensions.http.status,
				message: error.message,
			};
		},
	},
});

export default yoga;
