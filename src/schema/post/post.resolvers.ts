// import { ObjectId } from "mongodb";
import { ObjectId } from "bson";
import { Post } from "./post.model";

export default {
  Query: {
    getPost: async (parent, { data }) => {
      return await Post.collection.findOne({
        _id: new ObjectId(data._id),
      });
    },
  },
  Mutation: {
    createPost: async (parent, { data }) => {
      const post = new Post({
        ...data,
      });
      await post.save();
      return post;
    },
  },
};
