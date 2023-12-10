import { DocumentIdType } from "@src/shared/contracts/types";
import { UserTypes } from "@src/modules/user/enums";

export interface CreateSession {
  _id: DocumentIdType;
  type: UserTypes;
  ipAddress: string;
  device: Record<string, unknown>;
}
