"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost_service = void 0;
const bson_1 = require("bson");
const post_model_1 = require("./post.model");
const createPost_service = async (data) => {
    console.log(data.tags);
    // (1) Create post object
    const post = new post_model_1.Post({
        ...data,
        slug: data.title.split(" ").join("-"),
        authorId: !data.authorId
            ? new bson_1.ObjectId("63b9199463e4ca3f54005305")
            : data.authorId,
    });
    // (2) Save it into DB
    await post.save();
    // (3) Return created post
    return post;
};
exports.createPost_service = createPost_service;
