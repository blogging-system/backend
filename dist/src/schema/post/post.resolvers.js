"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_queries_service_1 = require("./post.queries.service");
const post_mutations_service_1 = require("./post.mutations.service");
exports.default = {
    Query: {
        getPostBySlug: async (parent, { data }) => {
            return await (0, post_queries_service_1.getPostBySlug_service)(data);
        },
    },
    Mutation: {
        createPost: async (parent, { data }) => {
            return await (0, post_mutations_service_1.createPost_service)(data);
        },
    },
};
