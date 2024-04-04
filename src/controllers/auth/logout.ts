/* Import packages */
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ACCEPTED } from "http-status";
/* Import configs */
import { withServiceContext } from "../../utils/withServiceContext";
import { HeadersWithAuthorization } from "../../types/auth";
/* Import services */
import AuthService from "../../services/auth/auth.service";
import SessionService from "../../services/session/session.service";

export const logout = (req: Request, res: Response) => withServiceContext(async (context, commit) => {
  const headers = req.headers as HeadersWithAuthorization;
  const { authorization: access_token } = headers
  if (access_token) {
    const verifyToken = AuthService.verifyToken(access_token) as JwtPayload;
    const { session_id } = verifyToken.payload;
    const sessionService = new SessionService(context);
    await sessionService.updateSession(session_id, { is_valid: 0 });
    await commit();
  }
  res.sendStatus(ACCEPTED);
})