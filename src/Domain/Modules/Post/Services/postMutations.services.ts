import { CreatePostDTO, DeletePostDTO, PublishPostDTO, UpdatePostDTO } from "../Types";
import { ForbiddenException, InternalServerException, NotFoundException } from "../../../../Shared/Exceptions";
import PostRepository from "../Repository/post.repository";
import mongoose, { Types } from "mongoose";
import TagServices from "../../Tag/Services";
import KeywordServices from "../../Keyword/Services";
import SeriesServices from "../../Series/Services";

export default class PostMutationsServices {
	public static async createPost(data: CreatePostDTO) {
		const createdPost = await PostRepository.createOne(data);

		if (!createdPost) throw new InternalServerException("the post creation failed!");

		return createdPost;
	}

	public static async updatePost(data: UpdatePostDTO) {
		const updatedPost = await PostRepository.updateOne({ _id: data._id }, { ...data.payload });

		if (updatedPost.matchedCount === 0) throw new NotFoundException("the post is not found!");
		if (updatedPost.modifiedCount === 0) throw new InternalServerException("the post update process failed!");

		return updatedPost;
	}

	public static async deletePost(data: DeletePostDTO) {
		const post = await PostRepository.findOne({ _id: data._id });

		if (!post) throw new NotFoundException("the post is not found!");

		await TagServices.deleteTagsIfNotReferencedInOtherPostsOrSeries({ tags: post.tags });
		await KeywordServices.deleteKeywordsIfNotReferencedInOtherPostsOrSeries({ keywords: post.keywords });

		const { deletedCount } = await PostRepository.deleteOne({ _id: data._id });

		if (deletedCount === 0) throw new InternalServerException("The post deletion process failed!");

		return "The post is deleted successfully!";
	}

	public static async publishPost(data: PublishPostDTO) {
		const post = await PostRepository.findOne({ _id: data._id });

		if (!post) throw new NotFoundException("The post is not found!");

		if (post.isPublished) throw new ForbiddenException("The post is already published!");

		const { modifiedCount } = await PostRepository.updateOne(
			{ _id: data._id },
			{ isPublished: true, isPublishedAt: new Date() }
		);

		if (modifiedCount === 0) throw new InternalServerException("The post publication failed!");

		return "The post is published successfully!";
	}
}
