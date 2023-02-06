import dotenv from "dotenv";
process.env.NODE_ENV === "development"
	? dotenv.config({
			path: "config/dev.env",
	  })
	: process.env.NODE_ENV === "production"
	? dotenv.config({
			path: "config/prod.env",
	  })
	: dotenv.config({
			path: "config/test.env",
	  });

import { createServer } from "http";
import { createYoga } from "graphql-yoga";
import { GraphQLError } from "graphql";
import mongoose from "mongoose";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import { makeExecutableSchema } from "@graphql-tools/schema";
// import { createContext } from "./context";

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({
	schema,
	// context: createContext,
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

// Pass it into a server to hook into request handlers.
const server = createServer(yoga);

// Start the server and you're done!
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI).then(async () => {
	server.listen(process.env.PORT, () => {
		console.info(
			`Server is running on ${process.env.HOST}:${process.env.PORT} in ${process.env.NODE_ENV} environment`
		);
	});
});
