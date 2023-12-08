import { CreatePostDto } from "../dtos/create-post.dto";

export interface PostManipulation extends CreatePostDto {
  _id: string;
  slug?: string;
  views?: number;
  isPublished?: boolean;
  publishedAt?: Date;
  unPublishedAt?: Date;
}
