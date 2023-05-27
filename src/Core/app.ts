import { createYoga } from "graphql-yoga";
import dotenv from "dotenv";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { handleHttpErrorResponse } from "../Shared/Http";
import { applyMiddleware } from "graphql-middleware";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

// Define your middleware function
const middleware = async (resolve, parent, args, context, info) => {
	console.log("Before resolving request");

	const result = await resolve(parent, args, context, info);

	console.log("After resolving request");

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
