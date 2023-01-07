"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
process.env.NODE_ENV === "development"
    ? dotenv_1.default.config({
        path: "config/dev.env",
    })
    : process.env.NODE_ENV === "production"
        ? dotenv_1.default.config({
            path: "config/prod.env",
        })
        : dotenv_1.default.config({
            path: "config/test.env",
        });
const http_1 = require("http");
const graphql_yoga_1 = require("graphql-yoga");
const mongoose_1 = __importDefault(require("mongoose"));
const resolvers_1 = __importDefault(require("./resolvers"));
const typeDefs_1 = __importDefault(require("./typeDefs"));
const schema_1 = require("@graphql-tools/schema");
// import { createContext } from "./context";
const schema = (0, schema_1.makeExecutableSchema)({
    typeDefs: typeDefs_1.default,
    resolvers: resolvers_1.default,
});
// Create a Yoga instance with a GraphQL schema.
const yoga = (0, graphql_yoga_1.createYoga)({
    schema,
    // context: createContext,
    landingPage: false,
    graphqlEndpoint: "/graphql",
});
// Pass it into a server to hook into request handlers.
const server = (0, http_1.createServer)(yoga);
// Start the server and you're done!
mongoose_1.default.set("strictQuery", false);
mongoose_1.default.connect(process.env.MONGODB_URI).then(() => {
    server.listen(process.env.PORT, () => {
        console.log(`Server is running on ${process.env.HOST}:${process.env.PORT}/graphql in ${process.env.NODE_ENV} environment`);
    });
});
