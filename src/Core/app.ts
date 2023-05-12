import { createYoga } from "graphql-yoga";
import { GraphQLError } from "graphql";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { handleHttpErrorResponse } from "../Shared/Http";
import { applyMiddleware } from "graphql-middleware";

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

// Define your middleware function
const middleware = async (resolve, parent, args, context, info) => {
	// Do something before resolving the request
	console.log("Before resolving request");

	// Resolve the request
	const result = await resolve(parent, args, context, info);

	// Do something after resolving the request
	console.log("After resolving request");

	// Return the result
	return result;
};

const yoga = createYoga({
	schema: applyMiddleware(schema, middleware),
	landingPage: false,
	graphqlEndpoint: "/",
	graphiql: true,
	logging: false,
	maskedErrors: {
		maskError(error: any) {
			return handleHttpErrorResponse(error);
		},
	},
});

export default yoga;
