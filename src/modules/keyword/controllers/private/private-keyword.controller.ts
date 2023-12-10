import {
  Get,
  Body,
  Post,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  Controller,
  UseInterceptors,
} from "@nestjs/common";
import { Keyword } from "../../schemas";
import { CreateKeywordDto } from "../../dtos";
import { KeywordService } from "../../services";
import { ProtectResourceInterceptor } from "@src/shared/interceptors";
import { DocumentIdType, ResultMessage } from "@src/shared/contracts/types";
import { AccountVerificationInterceptor } from "@src/shared/interceptors/is-verified.interceptor";

@Controller("/admin/keywords")
@UseInterceptors(ProtectResourceInterceptor, AccountVerificationInterceptor)
export class PrivateKeywordController {
  constructor(private keywordService: KeywordService) {}

  @Post()
  public createKeyword(@Body() data: CreateKeywordDto): Promise<Keyword> {
    return this.keywordService.createKeyword(data);
  }

  @Patch(":keywordId")
  public updateKeyword(
    @Param("keywordId") keywordId: DocumentIdType,
    @Body() data: CreateKeywordDto,
  ): Promise<Keyword> {
    return this.keywordService.updateKeyword(keywordId, data);
  }

  @Delete(":keywordId")
  @HttpCode(HttpStatus.OK)
  public deleteKeyword(@Param("keywordId") keywordId: DocumentIdType): Promise<ResultMessage> {
    return this.keywordService.deleteKeyword(keywordId);
  }

  @Get("/count")
  public getAllKeywordsCount(): Promise<ResultMessage> {
    return this.keywordService.getAllKeywordsCount();
  }
}
