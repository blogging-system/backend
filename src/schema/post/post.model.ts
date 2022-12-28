import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
  {
    name: {
      type: String,
    },
    body: {
      type: String,

    },
    isPublished: {
      type: Boolean,
    },
    views: {
      type: Number
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Post = mongoose.model("Post", PostSchema);
