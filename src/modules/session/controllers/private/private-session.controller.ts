import { AccountVerificationInterceptor } from "@src/shared/interceptors/is-verified.interceptor";
import { Controller, Delete, Get, Param, Req, UseInterceptors } from "@nestjs/common";
import { DocumentIdType, ResultMessage } from "@src/shared/contracts/types";
import { ProtectResourceInterceptor } from "@src/shared/interceptors";
import { SessionService } from "../../services";
import { CustomRequest } from "express";
import { Session } from "../../schemas";

@Controller("/admin/sessions")
@UseInterceptors(ProtectResourceInterceptor, AccountVerificationInterceptor)
export class PrivateSessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Delete("/:sessionId")
  public revokeSession(@Param("sessionId") sessionId: DocumentIdType): Promise<ResultMessage> {
    return this.sessionService.revokeSession(sessionId);
  }

  @Delete()
  public revokeAllSession(@Req() req: CustomRequest): Promise<ResultMessage> {
    return this.sessionService.revokeAllSessions(req.session.accessToken);
  }

  @Get()
  public getAllSessions(): Promise<Session[]> {
    return this.sessionService.getAllSessions();
  }
}
