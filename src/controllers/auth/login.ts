/* Import packages */
import { Request, Response } from "express";
import { FORBIDDEN, UNAUTHORIZED } from "http-status";
import pick from "lodash/pick";
/* Import configs */
import { withServiceContext } from "../../utils/withServiceContext";
import { ResponseError } from "../../classes/ResponseError";
import ERROR_CODE from "../../constants/ErrorCode";
/* Import services */
import AuthService from "../../services/auth/auth.service";
import UserService from "../../services/user/user.service";
import SessionService from "../../services/session/session.service";
import TwoFactorAuthService from "../../services/two-factor-auth/two-factor-auth.service";

export const login = (req: Request, res: Response) => withServiceContext(async (context, commit) => {
  const { body: { username, password, two_fa_code } } = req;
  const authService = new AuthService(context);
  const hashPassword = authService.hashPassword(password);
  const identity = await authService.get({ username, password: hashPassword });
  if (!identity) throw new ResponseError(UNAUTHORIZED, ERROR_CODE.AUTH_UNAUTHENTICATED);
  const userService = new UserService(context);
  const user = await userService.get({ user_id: identity.user_id });
  if (!user || (user && !user.is_active)) throw new ResponseError(UNAUTHORIZED, ERROR_CODE.AUTH_UNAUTHENTICATED);
  const twoFactorAuthService = new TwoFactorAuthService(context);
  const twoFactorAuth = await twoFactorAuthService.get({ user_id: user.user_id });
  if (twoFactorAuth && twoFactorAuth.is_enable) {
    const verified = twoFactorAuthService.verifyTwoFactorCode(twoFactorAuth.setup_code, two_fa_code);
    if (!verified) throw new ResponseError(FORBIDDEN, ERROR_CODE.AUTH_ACCESS_DENIED);
  }
  const userInfo = { ...user, ...identity };
  const tokenPayload = pick(userInfo, 'user_id', 'code', 'username', 'fullname', 'email', 'role');
  const sessionService = new SessionService(context);
  const createdSession = await sessionService.createSession(tokenPayload);
  await commit();
  const { access_token, refresh_token } = createdSession.dataValues;
  res.json({ user, access_token, refresh_token });
});