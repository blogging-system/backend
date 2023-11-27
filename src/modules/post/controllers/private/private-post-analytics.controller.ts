import { Controller, Get, Param, UseInterceptors } from '@nestjs/common'
import { ProtectResourceInterceptor } from 'src/shared/interceptors'
import { ResultMessage } from 'src/shared/types'
import { PostService } from '../../services'

@Controller('/admin/posts/analytics')
@UseInterceptors(ProtectResourceInterceptor)
export class PrivateAnalyticsPostController {
  constructor(private postService: PostService) {}

  @Get('/published/count/tags/:tagId')
  async getAllPublishedPostsCountForGivenTagId(@Param('tagId') tagId: string): Promise<ResultMessage> {
    return await this.postService.getAllPublishedPostsCountWithGivenTagId(tagId)
  }

  @Get('/unpublished/count/tags/:tagId')
  async getAllUnPublishedPostsCountForGivenTagId(@Param('tagId') tagId: string): Promise<ResultMessage> {
    return await this.postService.getAllUnPublishedPostsCountWithGivenTagId(tagId)
  }

  @Get('/count/tags/:tagId')
  async getAllPostsCountForGivenTagId(@Param('tagId') tagId: string): Promise<ResultMessage> {
    return await this.postService.getAllPostsCountWithGivenTagId(tagId)
  }
  //==========================

  // @Get('/published/count/keywords/:keywordId')
  // async getAllPublishedPostsCountForGivenKeywordId(@Param('keywordId') keywordId: string): Promise<ResultMessage> {
  //   return await this.postService.getAllPublishedPostsCountWithGivenKeywordId(keywordId)
  // }

  // @Get('/unpublished/count/keywords/:keywordId')
  // async getAllUnPublishedPostsCountForGivenKeywordId(@Param('keywordId') keywordId: string): Promise<ResultMessage> {
  //   return await this.postService.getAllUnPublishedPostsCountWithGivenKeywordId(keywordId)
  // }

  // @Get('/count/keywords/:tagId')
  // async getAllPostsCountForGivenKeywordId(@Param('tagId') tagId: string): Promise<ResultMessage> {
  //   return await this.postService.getAllPostsCountWithGivenkeywordId(tagId)
  // }
  // //==========================

  @Get('/published/count')
  async getAllPublishedPostsCount(): Promise<ResultMessage> {
    return await this.postService.getAllPublishedPostsCount()
  }

  @Get('/unpublished/count')
  async getAllUnPublishedPostsCount(): Promise<ResultMessage> {
    return await this.postService.getAllUnPublishedPostsCount()
  }

  @Get('/count')
  async getAllPostsCount(): Promise<ResultMessage> {
    return await this.postService.getAllPostsCount()
  }
}
