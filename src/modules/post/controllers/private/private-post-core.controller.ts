import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from "@nestjs/common";
import { ProtectResourceInterceptor } from "@src/shared/interceptors";
import { CreatePostDto, DeletePostDto, FilterPostDto } from "../../dtos";
import { DocumentIdType, ResultMessage } from "@src/shared/contracts/types";
import { Post as BlogPost } from "../../schemas";
import { Pagination } from "@src/shared/contracts/dtos";
import { PostService } from "../../services";

@Controller("/admin/posts")
@UseInterceptors(ProtectResourceInterceptor)
export class PrivatePostCoreController {
  constructor(private postService: PostService) {}

  @Post()
  public createPost(@Body() data: CreatePostDto): Promise<BlogPost> {
    return this.postService.createPost(data);
  }

  @Patch(":postId")
  public updatePost(@Param("postId") postId: DocumentIdType, @Body() payload: CreatePostDto): Promise<BlogPost> {
    return this.postService.updatePost(postId, payload);
  }

  @Delete(":postId")
  public deletePost(@Param() data: DeletePostDto): Promise<ResultMessage> {
    return this.postService.deletePost(data);
  }

  @Post("/publish/:postId")
  public publishPost(@Param("postId") postId: DocumentIdType): Promise<BlogPost> {
    return this.postService.publishPost(postId);
  }

  @Post("/unpublish/:postId")
  public unPublishPost(@Param("postId") postId: DocumentIdType): Promise<BlogPost> {
    return this.postService.unPublishPost(postId);
  }

  @Get("/latest")
  public getLatestPosts(@Query() { pageSize, pageNumber }: Pagination): Promise<BlogPost[]> {
    return this.postService.getLatestPosts({ pagination: { pageNumber, pageSize } });
  }

  @Get("/published")
  public getPublishedPosts(@Query() { pageSize, pageNumber }: Pagination): Promise<BlogPost[]> {
    return this.postService.getPublishedPosts({ pagination: { pageNumber, pageSize } });
  }

  @Get("/unpublished")
  public getUnPublishedPosts(@Query() { pageSize, pageNumber }: Pagination): Promise<BlogPost[]> {
    return this.postService.getUnPublishedPosts({ pagination: { pageNumber, pageSize } });
  }

  @Get("/popular")
  public getPopularPosts(@Query() pagination: Pagination): Promise<BlogPost[]> {
    return this.postService.getPopularPosts({ pagination });
  }

  @Get("/unpopular")
  public getUnPopular(@Query() pagination: Pagination): Promise<BlogPost[]> {
    return this.postService.getUnPopularPosts({ pagination });
  }

  @Get("/trending")
  public getTrendingPosts(@Query() pagination: Pagination): Promise<BlogPost[]> {
    return this.postService.getTrendingPosts({ pagination });
  }

  @Get(":slug")
  public getPostBySlug(@Param("slug") slug: string): Promise<BlogPost> {
    return this.postService.getPostBySlug({ slug });
  }

  @Get()
  public getAllPosts(@Query() { tagId, seriesId, ...pagination }: Pagination & FilterPostDto): Promise<BlogPost[]> {
    return this.postService.getAllPosts({ pagination, seriesId, tagId });
  }
}
