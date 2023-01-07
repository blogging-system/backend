"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_types_1 = __importDefault(require("./schema/post/post.types"));
const root = `#graphql
  scalar Date
  type Query
  type Mutation
`;
exports.default = [root, post_types_1.default];
