"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostBySlug_service = void 0;
const post_model_1 = require("./post.model");
const getPostBySlug_service = async (data) => {
    const post = await post_model_1.Post.collection.findOne({
        // _id: new ObjectId(data._id),
        slug: data.slug,
    });
    // const filteredKeys = ["_id", "title"];
    // const filteredPost = Object.assign(
    // 	{},
    // 	...filteredKeys.map((key) => ({ [key]: post[key] }))
    // );
    // console.log(filteredPost);
    // return filteredPost;
    return post;
};
exports.getPostBySlug_service = getPostBySlug_service;
