import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from "@nestjs/common";
import { AccountVerificationInterceptor } from "@src/shared/interceptors/is-verified.interceptor";
import { DocumentIdType, ResultMessage } from "@src/shared/contracts/types";
import { ProtectResourceInterceptor } from "@src/shared/interceptors";
import { TagService } from "../../services";
import { CreateTagDto } from "../../dtos";
import { Tag } from "../../schemas";

@Controller("/admin/tags")
@UseInterceptors(ProtectResourceInterceptor, AccountVerificationInterceptor)
export class PrivateTagController {
  constructor(private tagService: TagService) {}

  @Post()
  public createTag(@Body() data: CreateTagDto): Promise<Tag> {
    return this.tagService.createTag(data);
  }

  @Patch(":tagId")
  public updateTag(@Param("tagId") tagId: DocumentIdType, @Body() data: CreateTagDto): Promise<Tag> {
    return this.tagService.updateTag(tagId, data);
  }

  @Delete(":tagId")
  public deleteTag(@Param("tagId") tagId: DocumentIdType): Promise<ResultMessage> {
    return this.tagService.deleteTag(tagId);
  }

  @Get("/count")
  public getAllTagsCount(): Promise<ResultMessage> {
    return this.tagService.getAllTagsCount();
  }
}
