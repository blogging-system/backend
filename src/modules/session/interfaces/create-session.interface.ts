import { DocumentIdType } from "@src/shared/contracts/types";
import { ROLES } from "@src/modules/auth/enums";

export interface CreateSession {
  _id: DocumentIdType;
  roles: ROLES[];
  ipAddress: string;
  device: Record<string, unknown>;
}
