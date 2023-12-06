import { Controller, Get, Param, UseInterceptors } from '@nestjs/common'
import { ProtectResourceInterceptor } from '@src/infrastructure/interceptors'
import { ResultMessage } from '@src/shared/types'
import { PostService } from '../../services'

@Controller('/admin/posts/analytics')
@UseInterceptors(ProtectResourceInterceptor)
export class PrivateAnalyticsPostController {
  constructor(private postService: PostService) {}

  @Get('/published/count/tags/:tagId')
  public getAllPublishedPostsCountForGivenTagId(@Param('tagId') tagId: string): Promise<ResultMessage> {
    return this.postService.getAllPublishedPostsCountWithGivenTagId(tagId)
  }

  @Get('/unpublished/count/tags/:tagId')
  public getAllUnPublishedPostsCountForGivenTagId(@Param('tagId') tagId: string): Promise<ResultMessage> {
    return this.postService.getAllUnPublishedPostsCountWithGivenTagId(tagId)
  }

  @Get('/count/tags/:tagId')
  public getAllPostsCountForGivenTagId(@Param('tagId') tagId: string): Promise<ResultMessage> {
    return this.postService.getAllPostsCountWithGivenTagId(tagId)
  }

  @Get('/published/count/keywords/:keywordId')
  public getAllPublishedPostsCountForGivenKeywordId(@Param('keywordId') keywordId: string): Promise<ResultMessage> {
    return this.postService.getAllPublishedPostsCountWithGivenKeywordId(keywordId)
  }

  @Get('/unpublished/count/keywords/:keywordId')
  public getAllUnPublishedPostsCountForGivenKeywordId(@Param('keywordId') keywordId: string): Promise<ResultMessage> {
    return this.postService.getAllUnPublishedPostsCountWithGivenKeywordId(keywordId)
  }

  @Get('/count/keywords/:keywordId')
  public getAllPostsCountForGivenKeywordId(@Param('keywordId') keywordId: string): Promise<ResultMessage> {
    return this.postService.getAllPostsCountWithGivenKeywordId(keywordId)
  }

  @Get('/published/count/series/:seriesId')
  public getAllPublishedPostsCountForGivenSeriesId(@Param('seriesId') seriesId: string): Promise<ResultMessage> {
    return this.postService.getAllPublishedPostsCountWithGivenKeywordId(seriesId)
  }

  @Get('/unpublished/count/series/:seriesId')
  public getAllUnPublishedPostsCountForGivenSeriesId(@Param('seriesId') seriesId: string): Promise<ResultMessage> {
    return this.postService.getAllUnPublishedPostsCountWithGivenKeywordId(seriesId)
  }

  @Get('/count/series/:seriesId')
  public getAllPostsCountForGivenSeriesId(@Param('seriesId') seriesId: string): Promise<ResultMessage> {
    return this.postService.getAllPostsCountWithGivenKeywordId(seriesId)
  }

  @Get('/published/count')
  public getAllPublishedPostsCount(): Promise<ResultMessage> {
    return this.postService.getAllPublishedPostsCount()
  }

  @Get('/unpublished/count')
  public getAllUnPublishedPostsCount(): Promise<ResultMessage> {
    return this.postService.getAllUnPublishedPostsCount()
  }

  @Get('/count')
  public getAllPostsCount(): Promise<ResultMessage> {
    return this.postService.getAllPostsCount()
  }
}
