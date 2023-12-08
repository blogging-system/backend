import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from "@nestjs/common";
import { CreateSeriesDto, DeleteSeriesDto, GetAllSeriesDto, GetSeriesBySlug } from "../dtos";
import { DocumentIdType, ResultMessage } from "@src/shared/contracts/types";
import { PostService } from "@src/modules/post/services";
import { SeriesRepository } from "../repositories";
import { MESSAGES } from "../constants";
import { Series } from "../schemas";
import slugify from "slugify";

@Injectable()
export class SeriesService {
  constructor(
    private readonly seriesRepo: SeriesRepository,
    @Inject(forwardRef(() => PostService)) private readonly postService: PostService,
  ) {}

  public async createSeries(data: CreateSeriesDto): Promise<Series> {
    return await this.seriesRepo.createOne({ ...data, slug: slugify(data.title, { lower: true }) });
  }

  public async updateSeries(seriesId: DocumentIdType, payload: CreateSeriesDto): Promise<Series> {
    return await this.seriesRepo.updateOne(seriesId, { ...payload, slug: slugify(payload.title, { lower: true }) });
  }

  public async deleteSeries(data: DeleteSeriesDto): Promise<ResultMessage> {
    await this.isSeriesAssociatedToPosts(data.seriesId);

    await this.seriesRepo.deleteOne(data);

    return { message: MESSAGES.DELETED_SUCCESSFULLY };
  }

  public async publishSeries(seriesId: DocumentIdType): Promise<ResultMessage> {
    const isSeriesFound = await this.getSeries(seriesId);

    if (isSeriesFound.isPublished) throw new BadRequestException(MESSAGES.ALREADY_PUBLISHED);

    await this.seriesRepo.updateOne(seriesId, {
      isPublished: true,
      publishedAt: new Date(),
    });

    return { message: MESSAGES.PUBLISHED_SUCCESSFULLY };
  }

  public async unPublishSeries(seriesId: DocumentIdType): Promise<ResultMessage> {
    const isSeriesFound = await this.getSeries(seriesId);

    if (!isSeriesFound.isPublished) throw new BadRequestException(MESSAGES.ALREADY_UNPUBLISHED);

    await this.seriesRepo.updateOne(seriesId, {
      isPublished: false,
      unPublishedAt: new Date(),
    });

    return { message: MESSAGES.UNPUBLISHED_SUCCESSFULLY };
  }

  public async isSeriesAssociatedToPosts(seriesId: DocumentIdType): Promise<void> {
    const isSeriesAssociated = await this.postService.arePostsAvailableForGivenEntitiesIds({ seriesId });

    if (isSeriesAssociated) throw new BadRequestException(MESSAGES.SERIES_ASSOCIATED_TO_POST);
  }

  private async getSeries(seriesId: DocumentIdType): Promise<Series> {
    return await this.seriesRepo.findOne({ _id: seriesId });
  }

  private async isSeriesAvailable(seriesId: DocumentIdType): Promise<boolean> {
    return await this.seriesRepo.isFound({ _id: seriesId });
  }
  public async areSeriesAvailable(seriesIds: DocumentIdType[]): Promise<void> {
    const areAvailable = await Promise.all(seriesIds.map((id) => this.isSeriesAvailable(id)));

    if (areAvailable.includes(false)) throw new NotFoundException(MESSAGES.NOT_AVAILABLE);
  }

  public async getSeriesBySlug({ slug, isPublished }: GetSeriesBySlug): Promise<Series> {
    const query: GetSeriesBySlug = {
      slug,
    };

    if (isPublished) query.isPublished = isPublished;

    const isSeriesFound = await this.seriesRepo.findOne(query);

    await this.seriesRepo.updateOne(isSeriesFound._id, { views: isSeriesFound.views + 1 });

    return Object.assign(isSeriesFound, { views: isSeriesFound.views + 1 });
  }

  // public async getAllSeries({ pagination, isPublished, sortValue }: GetAllSeriesDto): Promise<Series[]> {
  //   return await this.seriesRepo.find({
  //     pagination,
  //     isPublished,
  //     sortCondition: sortValue == 1 ? `${SortFieldOptions.PUBLISHED_AT}` : `-${SortFieldOptions.PUBLISHED_AT}`,
  //   })
  // }

  // public async getLatestSeries({ pagination, isPublished }: GetAllSeriesDto): Promise<Series[]> {
  //   return await this.seriesRepo.find({
  //     pagination,
  //     isPublished,
  //     sortCondition: `-${SortFieldOptions.CREATED_AT}`,
  //   })
  // }

  // public async getPublishedSeries({ pagination }: GetAllSeriesDto): Promise<Series[]> {
  //   return await this.seriesRepo.find({
  //     pagination,
  //     isPublished: true,
  //     sortCondition: `-${SortFieldOptions.PUBLISHED_AT}`,
  //   })
  // }

  // public async getUnPublishedSeries({ pagination }: GetAllSeriesDto): Promise<Series[]> {
  //   return await this.seriesRepo.find({
  //     pagination,
  //     isPublished: false,
  //     sortCondition: `-${SortFieldOptions.PUBLISHED_AT}`,
  //   })
  // }

  // public async getPopularSeries({ pagination }: GetAllSeriesDto): Promise<Series[]> {
  //   return await this.seriesRepo.find({
  //     pagination,
  //     sortCondition: `-${SortFieldOptions.VIEWS}`,
  //   })
  // }

  // public async getUnPopularSeries({ pagination }: GetAllSeriesDto): Promise<Series[]> {
  //   return await this.seriesRepo.find({
  //     pagination,
  //     sortCondition: `+${SortFieldOptions.VIEWS}`,
  //   })
  // }

  // public async getTrendingSeries({ pagination }: GetAllSeriesDto): Promise<Series[]> {
  //   return await this.seriesRepo.find({
  //     pagination,
  //     sortCondition: { [SortFieldOptions.PUBLISHED_AT]: SortValueOptions.DESC, views: SortValueOptions.DESC },
  //   })
  // }

  public async getAllSeriesCount(): Promise<ResultMessage> {
    return await this.seriesRepo.countDocuments({});
  }

  public async getAllPublishedSeriesCount(): Promise<ResultMessage> {
    return await this.seriesRepo.countDocuments({ isPublished: true });
  }

  public async getAllUnPublishedSeriesCount(): Promise<ResultMessage> {
    return await this.seriesRepo.countDocuments({ isPublished: false });
  }
}
