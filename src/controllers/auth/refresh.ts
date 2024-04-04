/* Import packages */
import { Request, Response } from "express";
import { UNAUTHORIZED } from "http-status";
import pick from "lodash/pick";
/* Import configs */
import { withServiceContext } from "../../utils/withServiceContext";
import { ResponseError } from "../../classes/ResponseError";
import ERROR_CODE from "../../constants/ErrorCode";
/* Import services */
import AuthService from "../../services/auth/auth.service";
import SessionService from "../../services/session/session.service";
import UserService from "../../services/user/user.service";

export const refresh = (req: Request, res: Response) => withServiceContext(async (context, commit) => {
  const { body: { refreshToken } } = req;
  let verifyToken: any;
  try {
    verifyToken = AuthService.verifyToken(refreshToken);
  } catch (error) {
    throw new ResponseError(UNAUTHORIZED, ERROR_CODE.AUTH_TOKEN_EXP);
  }
  const { payload: session_id } = verifyToken;
  const sessionService = new SessionService(context)
  const sessionInfo: any = await sessionService.getSessionBySessionId(
    session_id
  );
  if (!sessionInfo) {
    throw new ResponseError(UNAUTHORIZED, ERROR_CODE.AUTH_UNAUTHENTICATED);
  }
  const { is_valid, user_id } = sessionInfo.dataValues;
  if (!is_valid) {
    throw new ResponseError(UNAUTHORIZED, ERROR_CODE.AUTH_UNAUTHENTICATED);
  }
  const userService = new UserService(context);
  const userInfo = await userService.get({
    user_id
  });
  if (!userInfo) {
    throw new ResponseError(UNAUTHORIZED, ERROR_CODE.AUTH_UNAUTHENTICATED);
  }
  const tokenPayload = pick(userInfo, 'user_id', 'code', 'username', 'fullname', 'email', 'role');
  await sessionService.refreshSession(
    tokenPayload,
    session_id
  );
  const userSession = await sessionService.getSessionBySessionId(session_id);

  await commit();

  const { access_token, refresh_token } = userSession?.dataValues || {};

  res.json({
    user: tokenPayload,
    refreshToken: refresh_token,
    accessToken: access_token,
  })
});