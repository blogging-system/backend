import { CreateSeriesDto } from "./create-series.dto";

export class SeriesManipulationDto extends CreateSeriesDto {
  _id: string;
  slug?: string;
  views?: number;
  isPublished?: boolean;
  publishedAt?: Date;
  unPublishedAt?: Date;
}
