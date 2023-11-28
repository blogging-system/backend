import { Controller, Get, Param, UseInterceptors } from '@nestjs/common'
import { ProtectResourceInterceptor } from 'src/shared/interceptors'
import { ResultMessage } from 'src/shared/types'
import { PostService } from '../../services'

@Controller('/admin/posts/analytics')
@UseInterceptors(ProtectResourceInterceptor)
export class PrivateAnalyticsPostController {
  constructor(private postService: PostService) {}

  @Get('/published/count/tags/:tagId')
  public async getAllPublishedPostsCountForGivenTagId(@Param('tagId') tagId: string): Promise<ResultMessage> {
    return await this.postService.getAllPublishedPostsCountWithGivenTagId(tagId)
  }

  @Get('/unpublished/count/tags/:tagId')
  public async getAllUnPublishedPostsCountForGivenTagId(@Param('tagId') tagId: string): Promise<ResultMessage> {
    return await this.postService.getAllUnPublishedPostsCountWithGivenTagId(tagId)
  }

  @Get('/count/tags/:tagId')
  public async getAllPostsCountForGivenTagId(@Param('tagId') tagId: string): Promise<ResultMessage> {
    return await this.postService.getAllPostsCountWithGivenTagId(tagId)
  }
  //==========================

  @Get('/published/count/keywords/:keywordId')
  public async getAllPublishedPostsCountForGivenKeywordId(
    @Param('keywordId') keywordId: string,
  ): Promise<ResultMessage> {
    return await this.postService.getAllPublishedPostsCountWithGivenKeywordId(keywordId)
  }

  @Get('/unpublished/count/keywords/:keywordId')
  public async getAllUnPublishedPostsCountForGivenKeywordId(
    @Param('keywordId') keywordId: string,
  ): Promise<ResultMessage> {
    return await this.postService.getAllUnPublishedPostsCountWithGivenKeywordId(keywordId)
  }

  @Get('/count/keywords/:keywordId')
  public async getAllPostsCountForGivenKeywordId(@Param('keywordId') keywordId: string): Promise<ResultMessage> {
    return await this.postService.getAllPostsCountWithGivenKeywordId(keywordId)
  }
  //==========================

  @Get('/published/count/series/:seriesId')
  public async getAllPublishedPostsCountForGivenSeriesId(@Param('seriesId') seriesId: string): Promise<ResultMessage> {
    return await this.postService.getAllPublishedPostsCountWithGivenKeywordId(seriesId)
  }

  @Get('/unpublished/count/series/:seriesId')
  public async getAllUnPublishedPostsCountForGivenSeriesId(
    @Param('seriesId') seriesId: string,
  ): Promise<ResultMessage> {
    return await this.postService.getAllUnPublishedPostsCountWithGivenKeywordId(seriesId)
  }

  @Get('/count/series/:seriesId')
  public async getAllPostsCountForGivenSeriesId(@Param('seriesId') seriesId: string): Promise<ResultMessage> {
    return await this.postService.getAllPostsCountWithGivenKeywordId(seriesId)
  }
  //==========================

  @Get('/published/count')
  public async getAllPublishedPostsCount(): Promise<ResultMessage> {
    return await this.postService.getAllPublishedPostsCount()
  }

  @Get('/unpublished/count')
  public async getAllUnPublishedPostsCount(): Promise<ResultMessage> {
    return await this.postService.getAllUnPublishedPostsCount()
  }

  @Get('/count')
  public async getAllPostsCount(): Promise<ResultMessage> {
    return await this.postService.getAllPostsCount()
  }
}
