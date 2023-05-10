import { createYoga } from "graphql-yoga";
import { GraphQLError } from "graphql";
import resolvers from "../Domain/resolvers";
import typeDefs from "../Domain/typeDefs";
import { makeExecutableSchema } from "@graphql-tools/schema";

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

const yoga = createYoga({
	schema,
	landingPage: false,
	graphqlEndpoint: "/",
	graphiql: true,
	logging: false,
	maskedErrors: {
		maskError(error: GraphQLError) {
			return {
				success: false,
				name: error.name,
				status: error.extensions.statusCode,
				code: error.extensions.statusMessage,
				message: error.message,
			};
		},
	},
});

export default yoga;
