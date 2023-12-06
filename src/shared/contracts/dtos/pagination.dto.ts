import { IsIn, IsNumber, IsPositive, Max, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class Pagination {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(10000)
  pageNumber?: number = 1

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Max(30)
  pageSize?: number = 10

  @Type(() => Number)
  @IsNumber()
  @IsIn([1, -1], { message: 'Sort value must be 1 or -1.' })
  sort?: number = 1
}
