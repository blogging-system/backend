import { DocumentIdType } from "@src/shared/contracts/types";
import { ROLES } from "@src/modules/user/enums";

export interface CreateSession {
  userId: DocumentIdType;
  roles: ROLES[];
  ipAddress: string;
  device: Record<string, unknown>;
}
