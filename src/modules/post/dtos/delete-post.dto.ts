import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";
import { DocumentIdType } from "@src/shared/contracts/types";

export class DeletePostDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  postId: DocumentIdType;
}
